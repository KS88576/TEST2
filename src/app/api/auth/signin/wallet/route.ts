import { PublicKey } from '@solana/web3.js';
import { verify } from '@noble/ed25519';
import bs58 from 'bs58';
import { generateToken } from "@/app/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../../lib/mongodb";
import { User } from "../../../../../../lib/user";

const MESSAGE_PREFIX = "Sign this message to verify your wallet ownership for Stable.fun: ";

async function verifyWalletSignature(
    walletAddress: string,
    signature: string,
    message: string
): Promise<boolean> {
    try {
        const publicKey = new PublicKey(walletAddress);
        const fullMessage = MESSAGE_PREFIX + message;
        const messageBytes = new TextEncoder().encode(fullMessage);
        const signatureBytes = bs58.decode(signature);
        const publicKeyBytes = publicKey.toBytes();
        
        return await verify(signatureBytes, messageBytes, publicKeyBytes);
    } catch (error) {
        console.error('Signature verification error:', error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const { walletAddress, signature, signatureMessage } = await request.json();

        if (!walletAddress || !signature || !signatureMessage) {
            return NextResponse.json(
                { error: 'Wallet address, signature, and message are required' },
                { status: 400 }
            );
        }

        // Verify wallet signature
        const isValid = await verifyWalletSignature(walletAddress, signature, signatureMessage);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        const client = await clientPromise;
        const db = client.db("ark"); // Your database name
        const users = db.collection<User>('users');

        const user = await users.findOne({ walletAddress });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const token = generateToken(user);

        return NextResponse.json({ 
            user, 
            token,
            message: 'Successfully signed in with wallet'
        });
    } catch (error) {
        console.error('Signin error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}