"use client"

import React, { useState } from 'react';
import { FiChevronDown, FiRepeat, FiDollarSign } from "react-icons/fi";
import { Dialog } from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';

interface Token {
  name: string;
  symbol: string;
  logo?: string;
  decimals: number;
}

const MintComponent: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const { requireAuth } = useAuth();
  const [selectedStablebond, setSelectedStablebond] = useState<Token>({
    name: "USD Treasury Bond",
    symbol: "UST+",
    decimals: 6
  });
  const [selectedStablecoin, setSelectedStablecoin] = useState<Token>({
    name: "USD Stablecoin",
    symbol: "USD+",
    decimals: 6
  });

  const handleAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d{0,6}$/.test(value)) {
      setAmount(value);
      // Calculate receive amount (1:1 for this example)
      setReceiveAmount(value);
    }
  };

  const handleMint = () => {
    requireAuth(() => {
      // This code will only execute if the user is authenticated
      console.log('Minting stablecoin...');
      // Add your minting logic here
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="w-full max-w-md bg-[#37474F]/90 rounded-2xl border border-[#00BCD4]/30 
        backdrop-blur-xl shadow-[0_0_50px_rgba(0,188,212,0.15)]">
        {/* Container Box */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Selling Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-gray-400 font-medium">You're Selling</span>
              <span className="text-gray-400 text-sm">
                Balance: 1000.00
              </span>
            </div>
            
            <div className="bg-[#2C393F] rounded-xl p-3 sm:p-4 border border-[#00BCD4]/20 
              hover:border-[#00BCD4]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center mb-3">
                <Dialog>
                  <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg 
                    bg-[#37474F] hover:bg-[#435761] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
                      <FiDollarSign className="w-4 h-4 text-[#00BCD4]" />
                    </div>
                    <span className="text-white font-medium">{selectedStablebond.symbol}</span>
                    <FiChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </Dialog>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.000000"
                  className="bg-transparent text-right text-white text-lg sm:text-xl font-medium 
                    focus:outline-none w-full sm:w-[180px] min-w-0"
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 truncate mr-2">{selectedStablebond.name}</span>
                <span className="text-[#00BCD4] whitespace-nowrap">≈ $1000.00</span>
              </div>
            </div>
          </div>

          {/* Swap Icons */}
          <div className="flex justify-center -my-2">
            <div className="bg-[#2C393F] p-2 rounded-lg border border-[#00BCD4]/30">
              <div className="bg-[#37474F] p-2 rounded-lg cursor-pointer hover:bg-[#435761] 
                transition-colors group">
                <FiRepeat className="w-5 h-5 text-[#00BCD4] group-hover:rotate-180 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Buying Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-gray-400 font-medium">You're Buying</span>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Rate: 1 {selectedStablebond.symbol} = 1 {selectedStablecoin.symbol}
              </span>
            </div>

            <div className="bg-[#2C393F] rounded-xl p-3 sm:p-4 border border-[#00BCD4]/20 
              hover:border-[#00BCD4]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center mb-3">
                <Dialog>
                  <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg 
                    bg-[#37474F] hover:bg-[#435761] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
                      <FiDollarSign className="w-4 h-4 text-[#00BCD4]" />
                    </div>
                    <span className="text-white font-medium">{selectedStablecoin.symbol}</span>
                    <FiChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </Dialog>
                <input
                  type="text"
                  value={receiveAmount}
                  readOnly
                  placeholder="0.000000"
                  className="bg-transparent text-right text-white text-lg sm:text-xl font-medium 
                    focus:outline-none w-full sm:w-[180px] min-w-0"
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 truncate mr-2">{selectedStablecoin.name}</span>
                <span className="text-[#00BCD4] whitespace-nowrap">≈ $1000.00</span>
              </div>
            </div>
          </div>

          {/* Mint Button */}
          <button 
            onClick={handleMint}
            className="w-full py-3 sm:py-4 bg-[#00BCD4] text-white rounded-xl font-medium 
              hover:bg-[#00BCD4]/80 transition-colors shadow-[0_0_20px_rgba(0,188,212,0.3)] 
              hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]"
          >
            Mint Stablecoin
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintComponent;