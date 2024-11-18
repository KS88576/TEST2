import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/app/utils/jwt";
import clientPromise from "../../../../../lib/mongodb";
import { User, UnverifiedUser } from "../../../../../lib/user";

export async function POST(request: NextRequest) {
    try {
      const { token: verificationToken, email } = await request.json();
  
      if (!verificationToken || !email) {
        return NextResponse.json(
          { error: 'Token and email are required' },
          { status: 400 }
        );
      }
  
      const client = await clientPromise;
      const db = client.db("ark");
      const users = db.collection<User>('users');
      const unverifiedUsers = db.collection<UnverifiedUser>('unverified_users');
  
      // Find the unverified user
      const unverifiedUser = await unverifiedUsers.findOne({
        emailId: email,
        verificationToken: verificationToken,
        tokenExpiry: { $gt: new Date() }
      });
  
      if (!unverifiedUser) {
        return NextResponse.json(
          { error: 'Invalid or expired verification token' },
          { status: 400 }
        );
      }
  
      // Create verified user
      const newUser: User = {
        username: unverifiedUser.username,
        emailId: unverifiedUser.emailId,
        walletAddress: unverifiedUser.walletAddress,
        authType: 'email',
        createdAt: unverifiedUser.createdAt,
        activeSince: new Date(),
      };
  
      const result = await users.insertOne(newUser);
      const created = await users.findOne({ _id: result.insertedId });
  
      // Generate JWT token
      const jwtToken = generateToken(created!);
  
      // Remove unverified user
      await unverifiedUsers.deleteOne({ emailId: email });
  
      return NextResponse.json({
        user: created,
        wallet: {
          address: unverifiedUser.walletAddress,
          privateKey: unverifiedUser.privateKey
        },
        token: jwtToken
      });
  
    } catch (error) {
      console.error('Verification error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }