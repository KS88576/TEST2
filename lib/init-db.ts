// lib/init-db.ts
import clientPromise from './mongodb';

async function createIndexes() {
    try {
        const client = await clientPromise;
        const db = client.db("ark");

        console.log("Creating indexes...");

        // Users collection indexes
        await db.collection('users').createIndexes([
            { key: { username: 1 }, unique: true },
            { key: { emailId: 1 }, unique: true, sparse: true },
            { key: { walletAddress: 1 }, unique: true },
            { key: { authType: 1 } },
            { key: { createdAt: 1 } },
            { key: { authType: 1, createdAt: -1 } }
        ]);

        // Unverified users collection indexes
        await db.collection('unverified_users').createIndexes([
            { key: { emailId: 1 }, unique: true },
            { key: { verificationToken: 1 }, unique: true },
            { key: { tokenExpiry: 1 }, expireAfterSeconds: 86400 },
            { key: { walletAddress: 1 }, unique: true },
            { key: { createdAt: 1 } },
            { key: { emailId: 1, verificationToken: 1 } }
        ]);

        console.log("Indexes created successfully");
    } catch (error) {
        console.error("Error creating indexes:", error);
        throw error;
    }
}

async function listIndexes() {
    try {
        const client = await clientPromise;
        const db = client.db("ark");
        
        console.log("\n=== Current Indexes ===\n");
        
        // List users collection indexes
        console.log("Users collection indexes:");
        const userIndexes = await db.collection('users').listIndexes().toArray();
        console.log(JSON.stringify(userIndexes, null, 2));
        
        // List unverified users collection indexes
        console.log("\nUnverified users collection indexes:");
        const unverifiedIndexes = await db.collection('unverified_users').listIndexes().toArray();
        console.log(JSON.stringify(unverifiedIndexes, null, 2));
        
        return {
            users: userIndexes,
            unverified_users: unverifiedIndexes
        };
    } catch (error) {
        console.error("Error listing indexes:", error);
        throw error;
    }
}

export { createIndexes, listIndexes };