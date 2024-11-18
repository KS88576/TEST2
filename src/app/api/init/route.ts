// app/api/init/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createIndexes, listIndexes } from "../../../../lib/init-db";
import clientPromise from "../../../../lib/mongodb";

export async function GET(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("ark");

        // Create collections if they don't exist
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        if (!collectionNames.includes('users')) {
            await db.createCollection('users');
        }

        if (!collectionNames.includes('unverified_users')) {
            await db.createCollection('unverified_users');
        }

        // Create indexes
        await createIndexes();

        // List all indexes to verify
        const indexes = await listIndexes();

        return NextResponse.json({
            message: 'Database initialized successfully',
            collections: collectionNames,
            indexes
        });
    } catch (error) {
        console.error('Initialization error:', error);
        return NextResponse.json(
            { error: 'Failed to initialize database' },
            { status: 500 }
        );
    }
}

// Add a status check endpoint
export async function POST(request: NextRequest) {
    try {
        const indexes = await listIndexes();
        return NextResponse.json({
            message: 'Database indexes retrieved successfully',
            indexes
        });
    } catch (error) {
        console.error('Status check error:', error);
        return NextResponse.json(
            { error: 'Failed to check database status' },
            { status: 500 }
        );
    }
}