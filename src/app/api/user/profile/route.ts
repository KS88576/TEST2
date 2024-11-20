// app/api/user/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from "../../../../../lib/mongodb";
import { getUserFromToken } from "../../../../../lib/auth";
import { differenceInDays } from 'date-fns';

// GET user profile data
export async function GET(request: NextRequest) {
  try {
    // Get user from auth token
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Format dates
    const joinDate = user.createdAt.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });

    const activeDays = differenceInDays(new Date(), user.activeSince);
    const activeSince = `${activeDays} days`;

    return NextResponse.json({
      username: user.username,
      walletAddress: user.walletAddress,
      joinDate,
      activeSince,
      email: user.emailId
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update username
export async function PATCH(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username } = await request.json();

    // Validate username
    if (!username || username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: 'Username must be between 3 and 20 characters' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("ark");
    const users = db.collection('users');

    // Check if username is taken
    const existingUser = await users.findOne({ 
      username,
      _id: { $ne: user._id }  // Exclude current user
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      );
    }

    // Update username
    await users.updateOne(
      { _id: user._id },
      { $set: { username } }
    );

    return NextResponse.json({ username });

  } catch (error) {
    console.error('Username update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}