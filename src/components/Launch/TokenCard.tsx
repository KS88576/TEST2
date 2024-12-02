"use client"

import React, { useState } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { TokenCardProps, StablecoinData } from '@/types';
import { Dialog } from "@/components/ui/dialog";
import TokenDetailsModal from './TokenDetailsModal';

const TokenCard: React.FC<TokenCardProps> = ({ token, onSelect }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const tokenDetails: StablecoinData = {
    ...token,
    apy: token.apy || "0%",
    tvl: token.tvl || "$0",
    volume24h: "$0",
    holders: 0,
    marketCap: token.marketCap || "$0",
    pairedBond: "-",
    currency: "USD",
  };

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="bg-[#37474F]/80 border border-[#00BCD4]/30 rounded-lg p-4 hover:border-[#00BCD4] 
        transition-all cursor-pointer backdrop-blur-sm hover:shadow-[0_0_20px_rgba(0,188,212,0.2)]
        hover:translate-y-[-2px] duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
              <FiDollarSign className="w-5 h-5 text-[#00BCD4]" />
            </div>
            <div>
              <h3 className="text-white font-bold">{token.name}</h3>
              <p className="text-gray-400 text-sm">{token.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#00BCD4]">${token.price}</p>
            <p className="text-gray-400 text-sm">{token.supply} tokens</p>
          </div>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <TokenDetailsModal token={tokenDetails} />
      </Dialog>
    </>
  );
};

export default TokenCard;