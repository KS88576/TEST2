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

// let's have a small text that would say, "Don't have an account? Sign up now". Then when we click on signup it will close all other modals that we're open (eg. the LoginModal) and it will open the SignupModal which will be another component. We'll write the code for SignupModal in another component.

// Let's update our ui to work with the flow of our endpoint logic, for example, the flow of Signup for email: Enter email -> Enter username -> generate wallet and show the user their wallet address and necessary keys to access their wallet -> ask the user to verify their email to activate their account -> verified email will result in a successfully created account.

// We'll use toast messages after every successful operation or failure operation.

// For the content of the signup component, we will have two other components, EmailSignup and WalletSignup. For EmailSignup, a user can input their email and username and we would be making use of our endpoint api/auth/signup/email when we click on the Continue button. If the POST request we made is successful, then we can close the modal and the login button that was at the header will be replaced with the username of the user and a dropdown next to it (this will be the same case for LoginModal after the POST request is successful). 

// For wallet signup, we will just have our button for connecting wallet and entering a username then make our POST request to api/auth/signup/email, we wi