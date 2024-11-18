"use client"

import React, { useState, useMemo } from 'react';
import { FiArrowUp, FiArrowDown, FiArrowRight, FiArrowLeft, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { Token } from '@/types';

interface RankingsTableProps {
  initialData: Token[];
}

interface TokenRank extends Token {
  currentPosition: number;
  previousPosition: number;
  change24h: number;
}

const RankingsTable: React.FC<RankingsTableProps> = ({ initialData }) => {
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string>('tvl');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Transform initialData to include ranking information
  const rankingsData: TokenRank[] = useMemo(() => {
    return initialData.map((token, index) => ({
      ...token,
      currentPosition: index + 1,
      previousPosition: index + 2, // This is mock data, in real app would come from backend
      change24h: token.change || 0
    }));
  }, [initialData]);

  // Sort function
  const sortedData = useMemo(() => {
    return [...rankingsData].sort((a, b) => {
      let compareValue = 0;
      
      switch (sortColumn) {
        case 'position':
          compareValue = a.currentPosition - b.currentPosition;
          break;
        case 'tvl':
          compareValue = parseFloat(a.tvl?.replace(/[^0-9.-]+/g, "") || '0') - 
                        parseFloat(b.tvl?.replace(/[^0-9.-]+/g, "") || '0');
          break;
        case 'price':
          compareValue = parseFloat(a.price) - parseFloat(b.price);
          break;
        case 'marketCap':
          compareValue = parseFloat(a.marketCap?.replace(/[^0-9.-]+/g, "") || '0') - 
                        parseFloat(b.marketCap?.replace(/[^0-9.-]+/g, "") || '0');
          break;
        case 'symbol':
          compareValue = a.symbol.localeCompare(b.symbol);
          break;
        case 'launchDate':
          compareValue = new Date(a.launchDate || 0).getTime() - new Date(b.launchDate || 0).getTime();
          break;
        default:
          compareValue = 0;
      }

      return sortDirection === 'asc' ? compareValue : -compareValue;
    });
  }, [rankingsData, sortColumn, sortDirection]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, page]);

  const SortIcon = ({ column }: { column: string }) => (
    <span className="ml-1 inline-block">
      {sortColumn === column ? (
        sortDirection === 'asc' ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />
      ) : (
        <FiArrowUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
      )}
    </span>
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const headers = [
    { key: 'position', label: 'Position' },
    { key: 'symbol', label: 'Token' },
    { key: 'tvl', label: 'Total Value Locked' },
    { key: 'price', label: 'Price Per Token' },
    { key: 'launchDate', label: 'Launch Date' },
    { key: 'marketCap', label: 'Market Cap' }
  ];

  return (
    <div className="bg-[#37474F]/90 rounded-xl border border-[#00BCD4]/30 overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#2C393F]">
              {headers.map((header) => (
                <th 
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  className="px-6 py-4 text-left text-sm font-medium text-gray-400 
                    cursor-pointer group hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    {header.label}
                    <SortIcon column={header.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#00BCD4]/10">
            {paginatedData.map((token) => (
              <tr 
                key={token.symbol}
                className="hover:bg-[#2C393F]/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">#{token.currentPosition}</span>
                    {token.previousPosition !== token.currentPosition && (
                      <span className={`text-xs ${
                        token.previousPosition > token.currentPosition ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {token.previousPosition > token.currentPosition ? (
                          <FiTrendingUp className="w-3 h-3" />
                        ) : (
                          <FiTrendingDown className="w-3 h-3" />
                        )}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-white font-medium">{token.symbol}</p>
                    <p className="text-gray-400 text-sm">{token.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">{token.tvl}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-white">${token.price}</span>
                    <span className={`text-sm ${
                      token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {token.change24h > 0 ? '+' : ''}{token.change24h}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">{token.launchDate}</td>
                <td className="px-6 py-4 text-white">{token.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#2C393F]">
        <span className="text-gray-400">
          Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, sortedData.length)} of {sortedData.length}
        </span>
        <div className="flex space-x-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#37474F] border border-[#00BCD4]/30 rounded-lg text-white 
            hover:border-[#00BCD4] transition-colors flex items-center space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page * 20 >= sortedData.length}
            className="px-4 py-2 bg-[#37474F] border border-[#00BCD4]/30 rounded-lg text-white 
            hover:border-[#00BCD4] transition-colors flex items-center space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankingsTable;