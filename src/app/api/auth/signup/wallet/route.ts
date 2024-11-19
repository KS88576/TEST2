// app/api/auth/signup/wallet/

import { PublicKey } from '@solana/web3.js';
import { verify } from '@noble/ed25519';
import bs58 from 'bs58';
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/app/utils/jwt";
import clientPromise from "../../../../../../lib/mongodb";
import { User } from "../../../../../../lib/user";

interface WalletSignupRequest {
  walletAddress: string;
  signature: string;
  signatureMessage: string;
  email?: string;
  username: string;
}

// Define a message format for signing
const MESSAGE_PREFIX = "Sign this message to verify your wallet ownership for Stable.fun: ";

export default async function verifyWalletSignature(
    walletAddress: string,
    signature: string,
    message: string
): Promise<boolean> {
    try {
        // Verify the wallet address is valid
        const publicKey = new PublicKey(walletAddress);
        
        // Reconstruct the original signed message
        const fullMessage = MESSAGE_PREFIX + message;
        
        // Convert the message to Uint8Array
        const messageBytes = new TextEncoder().encode(fullMessage);
        
        // Convert the signature from base58 to Uint8Array
        const signatureBytes = bs58.decode(signature);
        
        // Convert public key to Uint8Array
        const publicKeyBytes = publicKey.toBytes();
        
        // Verify the signature
        return await verify(signatureBytes, messageBytes, publicKeyBytes);
    } catch (error) {
        console.error('Signature verification error:', error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const { walletAddress, signature, signatureMessage, email, username } = 
            await request.json() as WalletSignupRequest;

        // Input validation
        if (!walletAddress || !signature || !signatureMessage || !username) {
            return NextResponse.json(
                { error: 'All required fields must be provided' },
                { status: 400 }
            );
        }

        // Username validation
        if (username.length < 3 || username.length > 20) {
            return NextResponse.json(
                { error: 'Username must be between 3 and 20 characters' },
                { status: 400 }
            );
        }

        // Email validation if provided
        if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Verify the wallet signature
        try {
            const isValid = await verifyWalletSignature(
                walletAddress,
                signature,
                signatureMessage
            );

            if (!isValid) {
                return NextResponse.json(
                    { error: 'Invalid wallet signature' },
                    { status: 400 }
                );
            }
        } catch (error) {
            return NextResponse.json(
                { error: 'Signature verification failed' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("ark");
        const users = db.collection<User>('users');

        // Check for existing user
        const existingUser = await users.findOne({
            $or: [
                { walletAddress },
                { username },
                ...(email ? [{ emailId: email }] : [])
            ]
        });

        if (existingUser) {
            let field = 'Wallet address';
            if (existingUser.username === username) field = 'Username';
            if (email && existingUser.emailId === email) field = 'Email';
            return NextResponse.json(
                { error: `${field} already exists` },
                { status: 400 }
            );
        }

        // Create new user
        const newUser: User = {
            username,
            emailId: email,
            walletAddress,
            authType: 'wallet',
            createdAt: new Date(),
            activeSince: new Date(),
            avatar: undefined // Optional avatar field
        };

        // Insert the new user
        const result = await users.insertOne(newUser);
        
        // Fetch the created user
        const createdUser = await users.findOne({ _id: result.insertedId });

        if (!createdUser) {
            throw new Error('Failed to create user');
        }

        // Generate JWT token
        const token = generateToken(createdUser);

        // Return success response
        return NextResponse.json({
            user: createdUser,
            token
        }, { status: 201 });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


