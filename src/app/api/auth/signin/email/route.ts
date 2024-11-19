// api/auth/signin/email

import { generateToken } from "@/app/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../../lib/mongodb";
import { User } from "../../../../../../lib/user";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("ark"); // Your database name
        const users = db.collection<User>('users');

        const user = await users.findOne({ 
            emailId: email,
            authType: 'email' // Make sure we're finding an email-authenticated user
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Optional: Update last active timestamp
        await users.updateOne(
            { _id: user._id },
            { $set: { activeSince: new Date() } }
        );

        const token = generateToken(user);

        return NextResponse.json({ 
            user, 
            token,
            message: 'Successfully signed in with email'
        });
    } catch (error) {
        console.error('Signin error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}