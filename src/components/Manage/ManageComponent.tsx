"use client"

import React, { useState, useEffect } from 'react';
import { FiPieChart, FiActivity, FiLock, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
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
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#37474F]/90 rounded-2xl border border-[#00BCD4]/30 
          backdrop-blur-xl shadow-[0_0_50px_rgba(0,188,212,0.15)]
          p-8 space-y-6 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BCD4]/0 via-[#00BCD4]/50 to-[#00BCD4]/0"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BCD4]/0 via-[#00BCD4]/50 to-[#00BCD4]/0"></div>
          
          {/* Lock Icon with glowing effect */}
          <div className="relative">
            <div className="w-16 h-16 mx-auto bg-[#2C393F] rounded-full flex items-center justify-center
              border border-[#00BCD4]/30 shadow-[0_0_20px_rgba(0,188,212,0.2)]">
              <FiLock className="w-8 h-8 text-[#00BCD4]" />
            </div>
            <div className="absolute inset-0 bg-[#00BCD4]/10 blur-xl rounded-full"></div>
          </div>

          {/* Text content */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
            <p className="text-gray-400 leading-relaxed">
              Please login to access the management dashboard and view your token portfolio.
            </p>
          </div>

          {/* Login button */}
          <button
            onClick={handleLoginClick}
            className="group relative w-full py-3 bg-[#00BCD4] text-white rounded-xl font-medium 
              hover:bg-[#00BCD4]/80 transition-all duration-300
              shadow-[0_0_20px_rgba(0,188,212,0.3)] 
              hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]
              flex items-center justify-center space-x-2"
          >
            <span>Continue to Login</span>
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00BCD4]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00BCD4]/10 rounded-full blur-3xl"></div>
        </div>
      </div>
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