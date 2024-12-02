"use client"

import React, { useState } from 'react';
import { FaSearchengin, FaFilter, FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import TokenRow from './TokenRow';
import TableHeader from './TableHeader';
import Pagination from './Pagination';
import { ApeToken } from './types';

const ApeOrSell: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('launchTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - replace with real data
  const [tokens] = useState<ApeToken[]>([
    {
      id: '1',
      name: 'Super Token',
      symbol: 'SUPER',
      launchTime: new Date(Date.now() - 1000), // 1 second ago
      volume24h: '$1,234,567',
      transactions24h: 1234,
      marketCap: '$10M',
      liquidity: '$5M',
      apy: '12.5%',
      price: '$1.23',
      priceChange24h: 5.67
    },
    // Add more mock data here
  ]);

  const handleSort = (column: string) => {
    setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const handleBuy = (token: ApeToken) => {
    console.log('Buy', token.symbol);
  };

  const handleSell = (token: ApeToken) => {
    console.log('Sell', token.symbol);
  };

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 relative inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BCD4] to-white">
            Arbitrage Arena
          </span>
          <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00BCD4] to-transparent" />
        </h1>
        <p className="text-gray-400">Discover and trade newly launched tokens</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tokens..."
            className="w-full bg-[#2C393F] text-white px-10 py-3 rounded-lg border border-[#00BCD4]/30 
              focus:border-[#00BCD4] outline-none"
          />
          <FaSearchengin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <button className="px-6 py-3 bg-[#2C393F] text-white rounded-lg border border-[#00BCD4]/30 
          hover:border-[#00BCD4] transition-colors flex items-center space-x-2">
          <FaFilter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#37474F]/90 rounded-xl border border-[#00BCD4]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <TableHeader
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
            </thead>
            <tbody className="divide-y divide-[#00BCD4]/10">
              {filteredTokens.map(token => (
                <TokenRow
                  key={token.id}
                  token={token}
                  onBuy={handleBuy}
                  onSell={handleSell}
                />
              ))}
            </tbody>
          </table>
        </div>
    <Pagination
      currentPage={currentPage}
      totalItems={filteredTokens.length}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
    />
</div>

{/* Stats Section */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
<div className="bg-[#2C393F] rounded-lg p-6 border border-[#00BCD4]/30">
  <p className="text-gray-400 text-sm">Total New Tokens (24h)</p>
  <p className="text-2xl font-bold text-white mt-2">147</p>
  <div className="flex items-center text-green-400 text-sm mt-1">
    <FaArrowTrendUp className="w-4 h-4 mr-1" />
    <span>+12.5%</span>
  </div>
</div>

<div className="bg-[#2C393F] rounded-lg p-6 border border-[#00BCD4]/30">
  <p className="text-gray-400 text-sm">Total Trading Volume (24h)</p>
  <p className="text-2xl font-bold text-[#00BCD4] mt-2">$24.5M</p>
  <div className="flex items-center text-green-400 text-sm mt-1">
    <FaArrowTrendUp className="w-4 h-4 mr-1" />
    <span>+8.3%</span>
  </div>
</div>

<div className="bg-[#2C393F] rounded-lg p-6 border border-[#00BCD4]/30">
  <p className="text-gray-400 text-sm">Average APY</p>
  <p className="text-2xl font-bold text-white mt-2">15.7%</p>
  <div className="flex items-center text-red-400 text-sm mt-1">
    <FaArrowTrendDown className="w-4 h-4 mr-1" />
    <span>-2.1%</span>
  </div>
</div>

<div className="bg-[#2C393F] rounded-lg p-6 border border-[#00BCD4]/30">
  <p className="text-gray-400 text-sm">Total Transactions (24h)</p>
  <p className="text-2xl font-bold text-[#00BCD4] mt-2">23,456</p>
  <div className="flex items-center text-green-400 text-sm mt-1">
    <FaArrowTrendUp className="w-4 h-4 mr-1" />
    <span>+15.2%</span>
  </div>
</div>
</div>
</div>
);
};

export default ApeOrSell;