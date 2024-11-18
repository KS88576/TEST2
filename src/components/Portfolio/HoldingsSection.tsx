"use client"

import React from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiMoreVertical } from 'react-icons/fi';

interface Token {
  name: string;
  symbol: string;
  amount: string;
  value: string;
  change: number;
  type: 'stablebond' | 'stablecoin';
  apy?: string;
}

const HoldingsSection: React.FC = () => {
  const tokens: Token[] = [
    {
      name: "US Treasury Bond",
      symbol: "UST+",
      amount: "1,234.56",
      value: "$1,234.56",
      change: 2.5,
      type: 'stablebond',
      apy: "5.2%"
    },
    {
      name: "EUR Treasury Bond",
      symbol: "EUT+",
      amount: "890.12",
      value: "$978.45",
      change: 1.8,
      type: 'stablebond',
      apy: "4.8%"
    },
    {
      name: "USD Stablecoin",
      symbol: "USD+",
      amount: "5,678.90",
      value: "$5,678.90",
      change: -1.2,
      type: 'stablecoin'
    },
    {
      name: "EUR Stablecoin",
      symbol: "EUR+",
      amount: "3,456.78",
      value: "$3,789.12",
      change: 0.8,
      type: 'stablecoin'
    }
  ];

  const renderTokenList = (type: 'stablebond' | 'stablecoin') => {
    const filteredTokens = tokens.filter(token => token.type === type);
    const totalValue = filteredTokens.reduce((acc, token) => 
      acc + parseFloat(token.value.replace('$', '').replace(',', '')), 0
    );
    
    return (
      <div className="bg-[#37474F]/90 rounded-lg p-6 border border-[#00BCD4]/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">
            Your {type === 'stablebond' ? 'Stablebonds' : 'Stablecoins'}
          </h3>
          <span className="text-[#00BCD4]">
            Total: ${totalValue.toLocaleString()}
          </span>
        </div>

        <div className="space-y-4">
          {filteredTokens.map((token, index) => (
            <div key={index} 
              className="flex justify-between items-center p-4 bg-[#2C393F] rounded-lg
              hover:shadow-[0_0_20px_rgba(0,188,212,0.15)] transition-all duration-300
              border border-[#00BCD4]/20 hover:border-[#00BCD4]/40 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
                  <FiDollarSign className="w-5 h-5 text-[#00BCD4]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-white font-medium">{token.symbol}</p>
                    {token.apy && (
                      <span className="text-xs bg-[#00BCD4]/20 text-[#00BCD4] px-2 py-0.5 rounded">
                        {token.apy} APY
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{token.name}</p>
                </div>
              </div>

              <div className="text-right flex items-center space-x-4">
                <div>
                  <p className="text-white font-medium">{token.amount}</p>
                  <div className="flex items-center justify-end space-x-2">
                    <span className="text-gray-400 text-sm">{token.value}</span>
                    <span className={`text-sm flex items-center ${
                      token.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {token.change >= 0 ? 
                        <FiTrendingUp className="w-3 h-3 mr-1" /> : 
                        <FiTrendingDown className="w-3 h-3 mr-1" />
                      }
                      {Math.abs(token.change)}%
                    </span>
                  </div>
                </div>

                <button className="opacity-0 group-hover:opacity-100 transition-opacity
                  p-2 hover:bg-white/5 rounded-full">
                  <FiMoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {renderTokenList('stablebond')}
      {renderTokenList('stablecoin')}
    </div>
  );
};

export default HoldingsSection;