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
        // Log incoming data for debugging
        console.log('Verification attempt:', {
            walletAddress,
            signatureLength: signature.length,
            messageLength: message.length
        });

        const publicKey = new PublicKey(walletAddress);
        const fullMessage = MESSAGE_PREFIX + message;
        const messageBytes = new TextEncoder().encode(fullMessage);
        
        // Add validation and logging for signature
        if (!signature || typeof signature !== 'string') {
            throw new Error('Invalid signature format');
        }
        
        try {
            const signatureBytes = bs58.decode(signature);
            console.log('Signature decoded successfully:', {
                originalLength: signature.length,
                decodedLength: signatureBytes.length
            });
            
            const publicKeyBytes = publicKey.toBytes();
            return await verify(signatureBytes, messageBytes, publicKeyBytes);
        } catch (err) {
            const error = err as Error;
            console.error('Signature decode error:', {
                signature: signature.slice(0, 20) + '...',
                error: error.message
            });
            throw new Error(`Invalid signature encoding: ${error.message}`);
        }
    } catch (err) {
        const error = err as Error;
        console.error('Signature verification error:', error);
        throw error;
    }
}