// src/components/LaunchButton.tsx
import { FC } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  AnchorProvider,
  Program,
  BN,
  web3
} from '@coral-xyz/anchor';
import { PROGRAM_ID } from '@/constants';
import { IDL, SolanaStablecoinProgram } from '@/idl';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useToast } from '@/hooks/useToast';

interface LaunchButtonProps {
  name: string;
  symbol: string;
  currency: string;
  onSuccess?: () => void;
  disabled?: boolean;
}

export const LaunchButton: FC<LaunchButtonProps> = ({
  name,
  symbol,
  currency,
  onSuccess,
  disabled
}) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { toast } = useToast();

  const handleLaunch = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      const provider = new AnchorProvider(
        connection,
        wallet as any,
        { commitment: 'confirmed' }
      );

      const program = new Program(
        IDL,
        PROGRAM_ID,
        provider
      );

      // Create mint for the stablecoin
      const mintKeypair = web3.Keypair.generate();

      // Derive PDAs
      const [factoryState] = PublicKey.findProgramAddressSync(
        [Buffer.from("factory_state")],
        program.programId
      );

      const [stablecoinState] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("stablecoin"),
          wallet.publicKey.toBuffer(),
          Buffer.from(symbol)
        ],
        program.programId
      );

      const [creatorState] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("user_state"),
          wallet.publicKey.toBuffer(),
          mintKeypair.publicKey.toBuffer()
        ],
        program.programId
      );

      // USDC mint address
      const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

      // Your bond mint address (you'll need to set this)
      const BOND_MINT = new PublicKey("Your_Bond_Mint_Address");
      const BOND_INFO = new PublicKey("Your_Bond_Info_Address");

      // Derive collateral vault PDA
      const [collateralVault] = PublicKey.findProgramAddressSync(
        [
          stablecoinState.toBuffer(),
          Buffer.from([/* your_seed_bytes */]),
          BOND_MINT.toBuffer()
        ],
        new PublicKey("Your_Token_Program_ID")
      );

      const tx = await program.methods
        .createStablecoin(
          name,
          symbol,
          currency
        )
        .accounts({
          creator: wallet.publicKey,
          factoryState,
          stablecoinState,
          creatorState,
          mint: mintKeypair.publicKey,
          yieldMint: USDC_MINT,
          collateralVault,
          bondMint: BOND_MINT,
          bondInfo: BOND_INFO,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([mintKeypair])
        .rpc();

      await connection.confirmTransaction(tx, 'confirmed');
      
      toast.success('Stablecoin created successfully!');
      console.log("Transaction signature", tx);
      onSuccess?.();

    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create stablecoin');
    }
  };

  return (
    <button 
      onClick={handleLaunch}
      disabled={disabled}
      className="w-full p-2.5 mt-4 bg-[#00BCD4] rounded-lg hover:bg-[#00BCD4]/80 
        transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed
        shadow-[0_0_20px_rgba(0,188,212,0.3)] hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]"
    >
      Launch Token
    </button>
  );
};