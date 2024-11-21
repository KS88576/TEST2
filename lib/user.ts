// lib/models/user.ts
import { ObjectId } from 'mongodb';

export type AuthType = 'email' | 'wallet';

export interface User {
  _id?: ObjectId;
  username: string;
  emailId?: string;
  walletAddress: string;
  authType: AuthType;
  avatar?: string;
  createdAt: Date;
  activeSince: Date;
}

export interface UnverifiedUser {
  _id?: ObjectId;
  username: string;
  emailId: string; // Required for unverified users since they're signing up with email
  walletAddress: string;
  privateKey: string; // Store temporarily until verification
  verificationToken: string;
  tokenExpiry: Date;
  createdAt: Date;
  activeSince: Date;
}

// rusty_dave@Ebere:~/solana_stablecoin$ anchor deploy --provider.cluster devnet
// Deploying cluster: https://api.devnet.solana.com
// Upgrade authority: /home/rusty_dave/.config/solana/id.json
// Deploying program "solana_stablecoin"...
// Program path: /home/rusty_dave/solana_stablecoin/target/deploy/solana_stablecoin.so...
// Program Id: 7gFZNhBQidDAqbzqbuFFzetrnordQLLpibV8hX5S2taU