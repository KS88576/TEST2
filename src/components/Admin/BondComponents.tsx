"use client";
import React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  AnchorProvider, 
  Program, 
  // web3,
  BN 
} from '@coral-xyz/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { PROGRAM_ID } from '@/constants';
import { IDL } from '@/idl';
import { useToast } from '@/hooks/useToast';
import { FiPlus, FiTrash2, FiAlertCircle } from 'react-icons/fi';

// Custom hook for add_supported_bond instruction
const useAddSupportedBond = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  // const { toast } = useToast();

  const addSupportedBond = async (
    bondMint: PublicKey,
    bondInfo: PublicKey,
    paymentFeedInfo: PublicKey,
    minCreationAmount: number,
    minRedemptionAmount: number
  ) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected');
    }

    const provider = new AnchorProvider(
      connection,
      wallet as any,
      { commitment: 'confirmed' }
    );

    const program = new Program(IDL, PROGRAM_ID, provider);

    // Derive factory state PDA
    const [factoryState] = PublicKey.findProgramAddressSync(
      [Buffer.from("factory_state")],
      program.programId
    );

    try {
      const tx = await program.methods
        .addSupportedBond(
          new BN(minCreationAmount),
          new BN(minRedemptionAmount)
        )
        .accounts({
          admin: wallet.publicKey,
          factoryState,
          bondMint,
          bondInfo,
          paymentFeedInfo,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error in addSupportedBond:', error);
      throw error;
    }
  };

  return { addSupportedBond };
};

// Custom hook for remove_bond instruction
const useRemoveBond = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  // const { toast } = useToast();

  const removeBond = async (bondMint: PublicKey) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected');
    }

    const provider = new AnchorProvider(
      connection,
      wallet as any,
      { commitment: 'confirmed' }
    );

    const program = new Program(IDL, PROGRAM_ID, provider);

    // Derive factory state PDA
    const [factoryState] = PublicKey.findProgramAddressSync(
      [Buffer.from("factory_state")],
      program.programId
    );

    try {
      const tx = await program.methods
        .removeBond()
        .accounts({
          admin: wallet.publicKey,
          factoryState,
          bondMint,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error in removeBond:', error);
      throw error;
    }
  };

  return { removeBond };
};

// Add Bond Form Component
interface AddBondFormProps {
  onSuccess?: () => void;
}

const AddBondForm: React.FC<AddBondFormProps> = ({ onSuccess }) => {
  const [bondMint, setBondMint] = React.useState('');
  const [bondInfo, setBondInfo] = React.useState('');
  const [paymentFeedInfo, setPaymentFeedInfo] = React.useState('');
  const [minCreationAmount, setMinCreationAmount] = React.useState('');
  const [minRedemptionAmount, setMinRedemptionAmount] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const { addSupportedBond } = useAddSupportedBond();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tx = await addSupportedBond(
        new PublicKey(bondMint),
        new PublicKey(bondInfo),
        new PublicKey(paymentFeedInfo),
        Number(minCreationAmount),
        Number(minRedemptionAmount)
      );
      
      toast.success('Bond added successfully');
      console.log('Transaction signature:', tx);
      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add bond');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">Bond Mint Address</label>
        <input
          type="text"
          value={bondMint}
          onChange={(e) => setBondMint(e.target.value)}
          className="w-full px-3 py-2 bg-[#37474F]/50 border border-[#00BCD4]/30 
            rounded-lg focus:border-[#00BCD4] text-white placeholder-gray-400 
            focus:outline-none transition-colors"
          placeholder="Enter bond mint address"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">Bond Info Account</label>
        <input
          type="text"
          value={bondInfo}
          onChange={(e) => setBondInfo(e.target.value)}
          className="w-full px-3 py-2 bg-[#37474F]/50 border border-[#00BCD4]/30 
            rounded-lg focus:border-[#00BCD4] text-white placeholder-gray-400 
            focus:outline-none transition-colors"
          placeholder="Enter bond info account address"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">Payment Feed Info</label>
        <input
          type="text"
          value={paymentFeedInfo}
          onChange={(e) => setPaymentFeedInfo(e.target.value)}
          className="w-full px-3 py-2 bg-[#37474F]/50 border border-[#00BCD4]/30 
            rounded-lg focus:border-[#00BCD4] text-white placeholder-gray-400 
            focus:outline-none transition-colors"
          placeholder="Enter payment feed info address"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">Min Creation Amount</label>
          <input
            type="number"
            value={minCreationAmount}
            onChange={(e) => setMinCreationAmount(e.target.value)}
            className="w-full px-3 py-2 bg-[#37474F]/50 border border-[#00BCD4]/30 
              rounded-lg focus:border-[#00BCD4] text-white placeholder-gray-400 
              focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">Min Redemption Amount</label>
          <input
            type="number"
            value={minRedemptionAmount}
            onChange={(e) => setMinRedemptionAmount(e.target.value)}
            className="w-full px-3 py-2 bg-[#37474F]/50 border border-[#00BCD4]/30 
              rounded-lg focus:border-[#00BCD4] text-white placeholder-gray-400 
              focus:outline-none transition-colors"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-[#00BCD4] text-white rounded-lg 
          hover:bg-[#00BCD4]/80 transition-colors
          shadow-[0_0_20px_rgba(0,188,212,0.3)] 
          hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center space-x-2"
      >
        <FiPlus className="w-5 h-5" />
        <span>{isSubmitting ? 'Adding Bond...' : 'Add Bond'}</span>
      </button>
    </form>
  );
};

// Remove Bond Component
const RemoveBondButton: React.FC<{
  bondMint: string;
  onSuccess?: () => void;
}> = ({ bondMint, onSuccess }) => {
  const [isRemoving, setIsRemoving] = React.useState(false);
  const { removeBond } = useRemoveBond();
  const { toast } = useToast();

  const handleRemove = async () => {
    if (!window.confirm('Are you sure you want to remove this bond?')) {
      return;
    }

    setIsRemoving(true);

    try {
      const tx = await removeBond(new PublicKey(bondMint));
      toast.success('Bond removed successfully');
      console.log('Transaction signature:', tx);
      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to remove bond');
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isRemoving}
      className="p-2 text-gray-400 hover:text-red-500 transition-colors
        rounded-lg hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center space-x-2"
    >
      {isRemoving ? (
        <FiAlertCircle className="w-5 h-5 animate-pulse" />
      ) : (
        <FiTrash2 className="w-5 h-5" />
      )}
    </button>
  );
};

export { AddBondForm, RemoveBondButton, useAddSupportedBond, useRemoveBond };