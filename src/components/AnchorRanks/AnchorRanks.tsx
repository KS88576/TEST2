"use client"

import React from 'react';
import CrownToken from './CrownToken';
import RankingsTable from './RankingsTable';
import { Token } from '@/types';

const AnchorRanks: React.FC = () => {
  const topToken: Token = {
    name: "USD Plus",
    symbol: "USD+",
    price: "1.00",
    tvl: "$123,456,789",
    change: 2.5,
    marketCap: "$98,765,432",
    // Adding required Token interface properties
    supply: "100,000,000",
    comments: [
      {
        user: "TopTrader",
        text: "Leading stablecoin with consistent performance"
      },
      {
        user: "CryptoAnalyst",
        text: "Highest TVL in the ecosystem"
      }
    ],
    type: "stablebond",
    // Additional optional properties
    apy: "5.2%",
    launchDate: "2023-09-01"
  };

  // Mock data for other top performers
  const topPerformers: Token[] = [
    topToken,
    {
      name: "EUR Plus",
      symbol: "EUR+",
      price: "1.08",
      tvl: "$98,765,432",
      change: 1.8,
      marketCap: "$87,654,321",
      supply: "80,000,000",
      comments: [],
      type: "stablebond",
      apy: "4.8%",
      launchDate: "2023-09-15"
    },
    {
      name: "GBP Plus",
      symbol: "GBP+",
      price: "1.25",
      tvl: "$76,543,210",
      change: 1.5,
      marketCap: "$65,432,109",
      supply: "60,000,000",
      comments: [],
      type: "stablebond",
      apy: "4.5%",
      launchDate: "2023-09-30"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Crown Token Section */}
      <div className="max-w-lg mx-auto">
        <CrownToken token={topToken} />
      </div>

      {/* Rankings Table */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Top Performers</h2>
          <div className="bg-[#2C393F] px-4 py-2 rounded-lg border border-[#00BCD4]/30">
            <span className="text-[#00BCD4]">{topPerformers.length}</span>
            <span className="text-gray-400 ml-2">tokens listed</span>
          </div>
        </div>
        <RankingsTable initialData={topPerformers} />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#37474F]/90 rounded-lg p-6 border border-[#00BCD4]/30">
          <h3 className="text-white font-medium mb-2">Total Value Locked</h3>
          <p className="text-2xl font-bold text-[#00BCD4]">$298,765,431</p>
          <p className="text-gray-400 text-sm mt-1">Across all platforms</p>
        </div>

        <div className="bg-[#37474F]/90 rounded-lg p-6 border border-[#00BCD4]/30">
          <h3 className="text-white font-medium mb-2">Average APY</h3>
          <p className="text-2xl font-bold text-[#00BCD4]">4.83%</p>
          <p className="text-gray-400 text-sm mt-1">Platform average</p>
        </div>

        <div className="bg-[#37474F]/90 rounded-lg p-6 border border-[#00BCD4]/30">
          <h3 className="text-white font-medium mb-2">Total Market Cap</h3>
          <p className="text-2xl font-bold text-[#00BCD4]">$251,851,862</p>
          <p className="text-gray-400 text-sm mt-1">All listed tokens</p>
        </div>
      </div>
    </div>
  );
};

export default AnchorRanks;