// lib/auth.ts
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from './mongodb';

interface DecodedToken {
  userId: string;
  iat?: number;
  exp?: number;
}

export interface UserType {
  _id: ObjectId;
  username: string;
  emailId?: string;
  walletAddress: string;
  authType: 'email' | 'wallet';
  createdAt: Date;
  activeSince: Date;
  avatar?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function getUserFromToken(request: NextRequest): Promise<UserType | null> {
  try {
    // First try to get token from cookie
    const token = request.cookies.get('token')?.value || 
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    // Verify token
    const decoded = verify(token, JWT_SECRET) as DecodedToken;
    if (!decoded?.userId) {
      return null;
    }

    // Get user from database
    const client = await clientPromise;
    const db = client.db("ark");
    const users = db.collection<UserType>('users');
    
    const user = await users.findOne({ 
      _id: new ObjectId(decoded.userId)
    });

    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}