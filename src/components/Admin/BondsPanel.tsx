"use client"

import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, BN, Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { FiPlus } from 'react-icons/fi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/useToast';
import { AddBondForm, RemoveBondButton } from './BondComponents';
import { PROGRAM_ID } from '@/constants';
import { IDL } from '@/idl';

interface Bond {
  bondMint: string;
  paymentMint: string;
  minCreationAmount: number;
  minRedemptionAmount: number;
  isEnabled: boolean;
}

interface BondConfig {
    bondMint: PublicKey;
    paymentMint: PublicKey;
    minCreationAmount: BN;
    minRedemptionAmount: BN;
    isEnabled: boolean;
  }

  interface BondCardProps {
    bond: Bond;
    onRemoved: () => void;
  }

const AdminBondsPanel = () => {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [isAddingBond, setIsAddingBond] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { connection } = useConnection();
  const wallet = useWallet();
  const { toast } = useToast();

  // Fetch bonds from the factory state
  const fetchBonds = async () => {
    if (!wallet.publicKey) return;

    try {
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

      const factoryStateAccount = await program.account.factoryState.fetch(factoryState);
      
      // Map the allowed_bond_configs to our Bond interface
      const bondConfigs = (factoryStateAccount.allowedBondConfigs as BondConfig[]).map((config: any) => ({
        bondMint: config.bondMint.toString(),
        paymentMint: config.paymentMint.toString(),
        minCreationAmount: config.minCreationAmount.toNumber(),
        minRedemptionAmount: config.minRedemptionAmount.toNumber(),
        isEnabled: config.isEnabled
      }));

      setBonds(bondConfigs);
    } catch (error) {
      console.error('Error fetching bonds:', error);
      toast.error('Failed to fetch bonds');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (wallet.publicKey) {
      fetchBonds();
    }
  }, [wallet.publicKey]);

  const handleBondAdded = () => {
    setIsAddingBond(false);
    fetchBonds();
  };

  const handleBondRemoved = () => {
    fetchBonds();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Supported Bonds</h2>
        <Dialog open={isAddingBond} onOpenChange={setIsAddingBond}>
          <DialogTrigger asChild>
            <button
              className="px-4 py-2 bg-[#00BCD4] text-white rounded-lg 
                hover:bg-[#00BCD4]/80 transition-colors 
                shadow-[0_0_20px_rgba(0,188,212,0.3)] 
                hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]
                flex items-center space-x-2"
            >
              <FiPlus className="w-5 h-5" />
              <span>Add Bond</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#263238] border border-[#00BCD4]/30 text-white">
            <DialogHeader>
              <DialogTitle>Add Supported Bond</DialogTitle>
            </DialogHeader>
            <AddBondForm onSuccess={handleBondAdded} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Bonds List Section */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-12 bg-[#37474F]/30 rounded-lg border border-[#00BCD4]/30">
            <div className="animate-pulse text-gray-400">Loading bonds...</div>
          </div>
        ) : bonds.length === 0 ? (
          <div className="text-center py-12 bg-[#37474F]/30 rounded-lg border border-[#00BCD4]/30">
            <p className="text-gray-400">No supported bonds found</p>
          </div>
        ) : (
          bonds.map((bond) => (
            <BondCard 
              key={bond.bondMint}
              bond={bond}
              onRemoved={handleBondRemoved}
            />
          ))
        )}
      </div>
    </div>
  );
};

const BondCard: React.FC<BondCardProps> = ({ bond, onRemoved }) => {
  return (
    <div className="p-4 bg-[#37474F]/30 rounded-lg border border-[#00BCD4]/30 
      hover:border-[#00BCD4]/50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-grow">
          <div className="flex items-center space-x-2">
            <h3 className="text-white font-medium">Bond Mint</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              bond.isEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {bond.isEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <p className="text-gray-300 text-sm font-mono break-all">{bond.bondMint}</p>
          
          <div className="text-sm text-gray-400 mt-2">
            Payment Mint
            <p className="text-gray-300 font-mono break-all">{bond.paymentMint}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-gray-400 text-sm">Min Creation</h4>
              <p className="text-white">{bond.minCreationAmount.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm">Min Redemption</h4>
              <p className="text-white">{bond.minRedemptionAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <RemoveBondButton 
          bondMint={bond.bondMint}
          onSuccess={onRemoved}
        />
      </div>
    </div>
  );
};

export default AdminBondsPanel;