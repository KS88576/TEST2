"use client"

import React, { useState } from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import AnchorRanks from "@/components/AnchorRanks/AnchorRanks";
import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi';

export default function RanksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('tvl');

  return (
    <AppLayout>
    <div className="min-h-screen bg-[#37474F]">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,188,212,0.1) 1px, transparent 1px),
              linear-gradient(rgba(0,188,212,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      {/* Page Header */}
      <div className="bg-[#2C393F] border-b border-[#00BCD4]/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Anchor Ranks</h1>
              <p className="text-gray-400">
                Discover and track top performing stablecoins and stablebonds
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tokens..."
                  className="bg-[#37474F] text-white pl-10 pr-4 py-2 rounded-lg border border-[#00BCD4]/30 
                    focus:border-[#00BCD4] outline-none w-full md:w-64"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Sort Dropdown */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#37474F] text-white px-4 py-2 rounded-lg border border-[#00BCD4]/30 
                  focus:border-[#00BCD4] outline-none appearance-none cursor-pointer"
              >
                <option value="tvl">Sort by TVL</option>
                <option value="marketCap">Sort by Market Cap</option>
                <option value="price">Sort by Price</option>
                <option value="change">Sort by 24h Change</option>
                <option value="launchDate">Sort by Launch Date</option>
              </select>

              {/* Filter Button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#37474F] text-white 
                rounded-lg border border-[#00BCD4]/30 hover:border-[#00BCD4] transition-colors">
                <FiFilter className="w-4 h-4" />
                <span>Filter</span>
              </button>

              {/* Export Button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#00BCD4] text-white 
                rounded-lg hover:bg-[#00BCD4]/80 transition-colors">
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#37474F]/90 rounded-lg p-4 border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">Total Tokens Listed</p>
            <p className="text-2xl font-bold text-white">86</p>
          </div>
          <div className="bg-[#37474F]/90 rounded-lg p-4 border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">Total Value Locked</p>
            <p className="text-2xl font-bold text-[#00BCD4]">$2.5B</p>
          </div>
          <div className="bg-[#37474F]/90 rounded-lg p-4 border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">24h Volume</p>
            <p className="text-2xl font-bold text-white">$156.8M</p>
          </div>
          <div className="bg-[#37474F]/90 rounded-lg p-4 border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">Average APY</p>
            <p className="text-2xl font-bold text-[#00BCD4]">4.83%</p>
          </div>
        </div>

        {/* Rankings Component */}
        <AnchorRanks />
      </main>
    </div>
    </AppLayout>
  );
}