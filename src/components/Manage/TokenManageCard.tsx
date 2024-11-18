"use client"

import React, { useState } from 'react';
import { FiEdit2, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { Dialog } from "@/components/ui/dialog";
import { Token } from '@/types';
import EditTokenModal from './EditTokenModal';

interface TokenManageCardProps {
  token: Token;
  onTokenUpdate: (updatedToken: Token) => void;
}

const TokenManageCard: React.FC<TokenManageCardProps> = ({ token, onTokenUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="bg-[#37474F]/90 border border-[#00BCD4]/30 rounded-lg p-4 sm:p-6 
        backdrop-blur-sm hover:shadow-[0_0_20px_rgba(0,188,212,0.2)] transition-all">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
              <FiDollarSign className="w-5 sm:w-6 h-5 sm:h-6 text-[#00BCD4]" />
            </div>
            <div>
              <h3 className="text-white text-lg sm:text-xl font-bold">{token.name}</h3>
              <p className="text-gray-400">{token.symbol}</p>
            </div>
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 hover:bg-[#00BCD4]/10 rounded-full transition-colors self-end sm:self-auto"
          >
            <FiEdit2 className="w-5 h-5 text-[#00BCD4]" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-[#2C393F] p-3 sm:p-4 rounded-lg border border-[#00BCD4]/20">
            <div className="flex items-center space-x-2 text-gray-400 mb-2 text-sm">
              <FiDollarSign className="w-4 h-4" />
              <span>Price</span>
            </div>
            <p className="text-lg sm:text-xl text-white truncate">${token.price}</p>
          </div>
          
          <div className="bg-[#2C393F] p-3 sm:p-4 rounded-lg border border-[#00BCD4]/20">
            <div className="flex items-center space-x-2 text-gray-400 mb-2 text-sm">
              <FiUsers className="w-4 h-4" />
              <span>Holders</span>
            </div>
            <p className="text-lg sm:text-xl text-white truncate">1,234</p>
          </div>

          <div className="bg-[#2C393F] p-3 sm:p-4 rounded-lg border border-[#00BCD4]/20 col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-2 text-gray-400 mb-2 text-sm">
              <FiTrendingUp className="w-4 h-4" />
              <span>Volume</span>
            </div>
            <p className="text-lg sm:text-xl text-white truncate">$45.2K</p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button className="p-3 bg-[#2C393F] rounded-lg border border-[#00BCD4]/20 
            hover:border-[#00BCD4] transition-colors text-white text-center text-sm sm:text-base">
            View Analytics
          </button>
          <button className="p-3 bg-[#2C393F] rounded-lg border border-[#00BCD4]/20 
            hover:border-[#00BCD4] transition-colors text-white text-center text-sm sm:text-base">
            Distribution
          </button>
        </div>
      </div>

      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <EditTokenModal 
          token={token} 
          onSave={onTokenUpdate}
          onClose={() => setShowEditModal(false)}
        />
      </Dialog>
    </>
  );
};

export default TokenManageCard;