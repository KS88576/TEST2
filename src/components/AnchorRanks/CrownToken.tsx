"use client"

import React from 'react';
import { FaChessKing, FaArrowTrendUp, FaDollarSign } from 'react-icons/fa6';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TokenDetailsModal from '@/components/Launch/TokenDetailsModal';
import { Token, StablecoinData } from '@/types';

interface CrownTokenProps {
  token: Token;
}

const CrownToken: React.FC<CrownTokenProps> = ({ token }) => {
  const tokenData: StablecoinData = {
    ...token,
    apy: token.apy || "0%",
    tvl: token.tvl || "$0",
    volume24h: "$0",
    holders: 0,
    supply: token.supply || "0",
    marketCap: token.marketCap || "$0",
    pairedBond: "-",
    currency: "USD",
    type: 'stablebond',
    comments: token.comments || [],
    change: token.change || 0
  };

  return (
    <div className="relative">
      {/* Crown Icon */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 
          flex items-center justify-center shadow-lg animate-pulse">
          <FaChessKing className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Token Card */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="mt-8 p-6 bg-[#37474F]/90 rounded-xl border border-[#00BCD4]/30 
            hover:border-[#00BCD4] transition-all cursor-pointer backdrop-blur-sm 
            hover:shadow-[0_0_30px_rgba(0,188,212,0.2)] group">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white mb-1">{token.name}</h2>
              <p className="text-[#00BCD4]">{token.symbol}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2C393F] p-4 rounded-lg border border-[#00BCD4]/20 
                group-hover:border-[#00BCD4]/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">TVL</span>
                  <FaArrowTrendUp className="w-4 h-4 text-[#00BCD4]" />
                </div>
                <p className="text-xl font-bold text-white">{token.tvl}</p>
              </div>

              <div className="bg-[#2C393F] p-4 rounded-lg border border-[#00BCD4]/20 
                group-hover:border-[#00BCD4]/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Price</span>
                  <FaDollarSign className="w-4 h-4 text-[#00BCD4]" />
                </div>
                <p className="text-xl font-bold text-white">${token.price}</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">Market Cap</p>
              <p className="text-lg font-bold text-white">{token.marketCap}</p>
            </div>
          </div>
        </DialogTrigger>
        <TokenDetailsModal token={tokenData} />
      </Dialog>
    </div>
  );
};

export default CrownToken;