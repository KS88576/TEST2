"use client"

import React, { useState } from 'react';
import { FiPieChart, FiActivity, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthRequired } from '@/components/auth/AuthRequired';
import TokenManageCard from './TokenManageCard';
import { StablecoinData } from '@/types';

const ManageComponent: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, requireAuth } = useAuth();
  
  const [userTokens, setUserTokens] = useState<StablecoinData[]>([
    { 
      name: "USD Stablecoin",
      symbol: "USD+",
      price: "1.00",
      supply: "49,225",
      apy: "5%",
      tvl: "$223,062",
      volume24h: "$1,234,567",
      holders: 1234,
      marketCap: "$98,765,432",
      pairedBond: "USTRY",
      currency: "USD",
      comments: [
        { user: "TopTrader", text: "Leading stablecoin with consistent performance" },
        { user: "CryptoAnalyst", text: "Highest TVL in the ecosystem" }
      ]
    },
    { 
      name: "Mexican Peso Stablecoin",
      symbol: "MXN+",
      price: "0.058",
      supply: "17,931,970",
      apy: "9%",
      tvl: "MX$2,726,007",
      volume24h: "MX$15,234,567",
      holders: 856,
      marketCap: "MX$89,765,432",
      pairedBond: "CETES",
      currency: "MXN",
      comments: [
        { user: "MexiTrader", text: "Best peso-backed stablecoin available" },
        { user: "LatamAnalyst", text: "Great for Mexican market exposure" }
      ]
    },
    { 
      name: "Euro Stablecoin",
      symbol: "EUR+",
      price: "1.08",
      supply: "6,913",
      apy: "2.4%",
      tvl: "€12,325.01",
      volume24h: "€2,234,567",
      holders: 445,
      marketCap: "€15,765,432",
      pairedBond: "EUROB",
      currency: "EUR",
      comments: [
        { user: "EuroTrader", text: "Stable Euro alternative" },
        { user: "EUAnalyst", text: "Great for European exposure" }
      ]
    }
  ]);

  const handleTokenUpdate = (updatedToken: StablecoinData) => {
    setUserTokens(prev => prev.map(token => 
      token.symbol === updatedToken.symbol ? updatedToken : token
    ));
  };

  const handleLoginClick = () => {
    requireAuth(() => {
      console.log('User authenticated');
    });
  };

  // Calculate total portfolio value in USD (simplified example)
  const portfolioValue = userTokens.reduce((total, token) => {
    const value = parseFloat(token.price) * parseFloat(token.supply.replace(/,/g, ''));
    return total + value;
  }, 0);

  // Calculate 24h change (simplified example)
  const portfolioChange = userTokens.reduce((total, token) => {
    const change = token.change || 0;
    return total + change;
  }, 0) / userTokens.length;

  if (!isAuthenticated) {
    return (
      <AuthRequired message="Please login to access the management dashboard and view your token portfolio." />
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
          <p className="text-2xl sm:text-3xl text-white font-bold">
            ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`${portfolioChange >= 0 ? 'text-green-400' : 'text-red-400'} mt-2`}>
            {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}% (24h)
          </p>
        </div>

        <div className="bg-[#37474F]/90 border border-[#00BCD4]/30 rounded-lg p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-3 sm:mb-4">
            <FiActivity className="w-5 h-5 text-[#00BCD4]" />
            <h2 className="text-white text-lg sm:text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="space-y-2">
            {userTokens.slice(0, 2).map((token, index) => (
              <p key={index} className="text-gray-400 text-sm sm:text-base">
                Token {token.symbol} TVL: {token.tvl} • {index + 2}h ago
              </p>
            ))}
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