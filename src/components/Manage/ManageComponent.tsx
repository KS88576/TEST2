"use client"

import React, { useState, useEffect } from 'react';
import { FiPieChart, FiActivity, FiLock, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthRequired } from '@/components/auth/AuthRequired';
import TokenManageCard from './TokenManageCard';
import { Token } from '@/types';

const ManageComponent: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, requireAuth } = useAuth();
  const [userTokens, setUserTokens] = useState<Token[]>([
    {
      name: "USD Plus",
      symbol: "USD+",
      price: "1.00",
      supply: "1,000,000",
      comments: []
    },
    {
      name: "EUR Plus",
      symbol: "EUR+",
      price: "1.08",
      supply: "500,000",
      comments: []
    }
  ]);

  const handleTokenUpdate = (updatedToken: Token) => {
    setUserTokens(prev => prev.map(token => 
      token.symbol === updatedToken.symbol ? updatedToken : token
    ));
  };

  const handleLoginClick = () => {
    requireAuth(() => {
      console.log('User authenticated');
    });
  };

  if (!isAuthenticated) {
    return (
      <AuthRequired message=" Please login to access the management dashboard and view your token portfolio." />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 max-w-7xl">
      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-[#37474F]/90 border border-[#00BCD4]/30 rounded-lg p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-3 sm:mb-4">
            <FiPieChart className="w-5 h-5 text-[#00BCD4]" />
            <h2 className="text-white text-lg sm:text-xl font-bold">Portfolio Value</h2>
          </div>
          <p className="text-2xl sm:text-3xl text-white font-bold">$1,234,567.89</p>
          <p className="text-[#00BCD4] mt-2">+5.23% (24h)</p>
        </div>

        <div className="bg-[#37474F]/90 border border-[#00BCD4]/30 rounded-lg p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-3 sm:mb-4">
            <FiActivity className="w-5 h-5 text-[#00BCD4]" />
            <h2 className="text-white text-lg sm:text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-400 text-sm sm:text-base">Token USD+ updated • 2h ago</p>
            <p className="text-gray-400 text-sm sm:text-base">New holder joined • 5h ago</p>
          </div>
        </div>
      </div>

      {/* Your Tokens Section */}
      <div>
        <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Tokens</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {userTokens.map((token, index) => (
            <TokenManageCard
              key={index}
              token={token}
              onTokenUpdate={handleTokenUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageComponent;