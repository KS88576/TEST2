// Create a new file: src/lib/wallet.ts
import { PublicKey } from '@solana/web3.js';
import { verify } from '@noble/ed25519';
import bs58 from 'bs58';

// Define a message format for signing
export const MESSAGE_PREFIX = "Sign this message to verify your wallet ownership for Stable.fun: ";

export async function verifyWalletSignature(
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