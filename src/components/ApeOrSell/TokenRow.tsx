"use client"

import React from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiClock } from 'react-icons/fi';
import { TokenRowProps } from './types';

const TokenRow: React.FC<TokenRowProps> = ({ token, onBuy, onSell }) => {
  const getTimeAgo = (launchTime: Date) => {
    const seconds = Math.floor((new Date().getTime() - launchTime.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <tr className="hover:bg-[#2C393F]/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
            {token.logoUrl ? (
              <img src={token.logoUrl} alt={token.name} className="w-6 h-6 rounded-full" />
            ) : (
              <FiDollarSign className="w-5 h-5 text-[#00BCD4]" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-white font-medium">{token.symbol}</p>
              <span className="px-2 py-0.5 text-xs bg-[#00BCD4]/20 text-[#00BCD4] rounded-full">
                NEW
              </span>
            </div>
            <div className="flex items-center text-gray-400 text-sm space-x-1">
              <FiClock className="w-3 h-3" />
              <span>{getTimeAgo(token.launchTime)}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-white">{token.volume24h}</p>
          <p className="text-sm text-gray-400">
            {token.transactions24h.toLocaleString()} txs
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-white">{token.price}</span>
          <span className={`flex items-center text-sm ${
            token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {token.priceChange24h >= 0 ? (
              <FiTrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <FiTrendingDown className="w-3 h-3 mr-1" />
            )}
            {Math.abs(token.priceChange24h)}%
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-white">{token.marketCap}</td>
      <td className="px-6 py-4 text-white">{token.liquidity}</td>
      <td className="px-6 py-4">
        <span className="text-[#00BCD4] font-medium">{token.apy}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onBuy(token)}
            className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg 
              hover:bg-green-500/30 transition-colors text-sm"
          >
            Buy
          </button>
          <button
            onClick={() => onSell(token)}
            className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg 
              hover:bg-red-500/30 transition-colors text-sm"
          >
            Sell
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TokenRow;