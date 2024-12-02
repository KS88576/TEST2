// api/auth/signup/email

import { NextRequest, NextResponse } from 'next/server';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import clientPromise from "../../../../../../lib/mongodb";
import { User } from "../../../../../../lib/user";
import { sendVerificationEmail } from "../../../../../../lib/email";
import { generateVerificationToken } from "../../../../../../lib/utils";

// First, create a temporary users collection for unverified signups
interface UnverifiedUser extends Omit<User, 'authType'> {
  verificationToken: string;
  tokenExpiry: Date;
  walletAddress: string;
  privateKey: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, username } = await request.json();

    // Validate request
    if (!email || !username) {
      return NextResponse.json(
        { error: 'Email and username are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("ark");
    const users = db.collection<User>('users');
    const unverifiedUsers = db.collection<UnverifiedUser>('unverified_users');

    // Check if email or username exists in verified users
    const existingUser = await users.findOne({
      $or: [
        { emailId: email },
        { username: username }
      ]
    });

    if (existingUser) {
      const field = existingUser.emailId === email ? 'Email' : 'Username';
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 400 }
      );
    }

    // Generate wallet
    const keypair = Keypair.generate();
    const walletAddress = keypair.publicKey.toString();
    const privateKey = bs58.encode(keypair.secretKey);

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); // 24 hour expiry

    // Create unverified user
    const unverifiedUser: UnverifiedUser = {
      username,
      emailId: email,
      walletAddress,
      privateKey, // Store temporarily
      verificationToken,
      tokenExpiry,
      createdAt: new Date(),
      activeSince: new Date(),
    };

    // Remove any existing unverified entries for this email
    await unverifiedUsers.deleteMany({ emailId: email });

    // Insert new unverified user
    await unverifiedUsers.insertOne(unverifiedUser);

    // Send verification email
    await sendVerificationEmail(email, verificationToken, username);

    return NextResponse.json({
      message: 'Verification email sent. Please check your inbox.',
      email
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}