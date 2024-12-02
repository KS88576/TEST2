"use client"

import React, { useState } from 'react';
import { FiChevronDown, FiRepeat, FiDollarSign } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';

interface Token {
  name: string;
  symbol: string;
  logo?: string;
  decimals: number;
}

interface BondDetails {
  symbol: string;
  name: string;
  apy: string;
  tvl: string;
  tokensAvailable: number;
  cost: string;
  currency: string;
  startDate: string;
  pairedStablecoin: Token;
}

const bonds: BondDetails[] = [
  {
    symbol: "CETES",
    name: "Mexican Treasury Bond",
    apy: "9%",
    tvl: "MX$2,726,007",
    tokensAvailable: 17931970,
    cost: "MX$1.05953",
    currency: "MXN",
    startDate: "11/28/2024, 8 PM",
    pairedStablecoin: { name: "Mexican Peso Stablecoin", symbol: "MXN+", decimals: 6 }
  },
  {
    symbol: "USTRY",
    name: "US Treasury Bond",
    apy: "5%",
    tvl: "$223,062",
    tokensAvailable: 49225,
    cost: "$1.01199",
    currency: "USD",
    startDate: "11/28/2024, 10 PM",
    pairedStablecoin: { name: "USD Stablecoin", symbol: "USD+", decimals: 6 }
  },
  {
    symbol: "TESOURO",
    name: "Brazilian Treasury Bond",
    apy: "10%",
    tvl: "R$49,755.80",
    tokensAvailable: 365855,
    cost: "R$1.00125",
    currency: "BRL",
    startDate: "11/28/2024, 8 PM",
    pairedStablecoin: { name: "Brazilian Real Stablecoin", symbol: "BRL+", decimals: 6 }
  },
  {
    symbol: "EUROB",
    name: "European Treasury Bond",
    apy: "2.4%",
    tvl: "€12,325.01",
    tokensAvailable: 6913,
    cost: "€1.00154",
    currency: "EUR",
    startDate: "11/28/2024, 8 PM",
    pairedStablecoin: { name: "Euro Stablecoin", symbol: "EUR+", decimals: 6 }
  },
  {
    symbol: "GILTS",
    name: "British Treasury Bond",
    apy: "3%",
    tvl: "£12,285.07",
    tokensAvailable: 17380,
    cost: "£1.00417",
    currency: "GBP",
    startDate: "11/28/2024, 8 PM",
    pairedStablecoin: { name: "British Pound Stablecoin", symbol: "GBP+", decimals: 6 }
  }
];

const MintComponent: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const { requireAuth } = useAuth();
  const [selectedBond, setSelectedBond] = useState<BondDetails>(bonds[0]);
  const [isBondDialogOpen, setIsBondDialogOpen] = useState(false);

  const handleAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d{0,6}$/.test(value)) {
      setAmount(value);
      setReceiveAmount(value); // 1:1 for this example
    }
  };

  const handleMint = () => {
    requireAuth(() => {
      console.log('Minting stablecoin...');
    });
  };

  const handleBondSelect = (bond: BondDetails) => {
    setSelectedBond(bond);
    setIsBondDialogOpen(false);
  };

  const BondOption: React.FC<{ bond: BondDetails }> = ({ bond }) => (
    <button
      onClick={() => handleBondSelect(bond)}
      className="w-full px-3 sm:px-4 py-3 sm:py-4 hover:bg-[#435761] transition-colors flex flex-col gap-2 
        sm:gap-3 focus:outline-none focus:bg-[#435761]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00BCD4]/20 flex items-center justify-center 
            shrink-0"
          >
            <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#00BCD4]" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-medium text-sm sm:text-base">{bond.symbol}</h3>
            <p className="text-gray-400 text-xs sm:text-sm">{bond.name}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[#00BCD4] font-semibold text-sm sm:text-base">{bond.apy} APY</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">TVL: {bond.tvl}</p>
        </div>
      </div>
  
      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mt-1">
        <div>
          <p className="text-gray-400">Cost</p>
          <p className="text-white font-medium">{bond.cost}</p>
        </div>
        <div>
          <p className="text-gray-400">Available</p>
          <p className="text-white font-medium">{bond.tokensAvailable.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-1 text-xs sm:text-sm">
        <p className="text-gray-400">Launch Date</p>
        <p className="text-white font-medium">{bond.startDate}</p>
      </div>
    </button>
  );

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="w-full max-w-md bg-[#37474F]/90 rounded-2xl border border-[#00BCD4]/30 
        backdrop-blur-xl shadow-[0_0_50px_rgba(0,188,212,0.15)]">
        <div className="p-4 sm:p-6 space-y-6">
          {/* Selling Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-gray-400 text-sm sm:text-base font-medium">You're Selling</span>
              <span className="text-gray-400 text-xs sm:text-sm">
                Balance: 1000.00
              </span>
            </div>
            
            <div className="bg-[#2C393F] rounded-xl p-3 sm:p-4 border border-[#00BCD4]/20 
              hover:border-[#00BCD4]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center mb-3">
              <Dialog open={isBondDialogOpen} onOpenChange={setIsBondDialogOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg 
                    bg-[#37474F] hover:bg-[#435761] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
                      <FiDollarSign className="w-4 h-4 text-[#00BCD4]" />
                    </div>
                    <span className="text-white font-medium">{selectedBond.symbol}</span>
                    <FiChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                </DialogTrigger>
                <DialogContent 
                    className="bg-[#37474F] border-[#00BCD4]/30 p-0 
                      sm:max-w-xl w-[calc(100%-2rem)] sm:w-full
                      overflow-hidden rounded-xl
                      fixed sm:fixed
                      bottom-0 sm:bottom-auto left-0 right-0 
                      sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
                      h-[80vh] sm:h-auto sm:max-h-[85vh]
                      transition-transform duration-300"
                  >
                  <DialogHeader className="p-3 sm:p-4 border-b border-[#00BCD4]/20 bg-[#2C393F]/50 backdrop-blur-sm 
                    sticky top-0 z-10"
                  >
                    <DialogTitle className="text-base sm:text-lg text-white font-semibold">
                      Select Bond
                    </DialogTitle>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                      Choose a treasury bond to mint stablecoins
                    </p>
                  </DialogHeader>
                  
                  <div className="overflow-y-auto overscroll-contain
                    divide-y divide-[#00BCD4]/10
                    scroll-smooth
                    h-[calc(100%-4rem)] sm:max-h-[60vh]"
                  >
                    {bonds.map((bond) => (
                      <BondOption key={bond.symbol} bond={bond} />
                    ))}
                  </div>
                </DialogContent>
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
                <span className="text-gray-400 truncate mr-2">{selectedBond.name}</span>
                <span className="text-[#00BCD4] whitespace-nowrap">≈ {selectedBond.cost}</span>
              </div>
            </div>
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center -my-1 sm:-my-2">
            <div className="bg-[#2C393F] p-1.5 sm:p-2 rounded-lg border border-[#00BCD4]/30">
              <div className="bg-[#37474F] p-1.5 sm:p-2 rounded-lg cursor-pointer hover:bg-[#435761] 
                transition-colors group">
                <FiRepeat className="w-4 h-4 sm:w-5 sm:h-5 text-[#00BCD4] group-hover:rotate-180 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Buying Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-gray-400 text-sm sm:text-base font-medium">You're Buying</span>
              <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                Rate: 1 {selectedBond.symbol} = 1 {selectedBond.pairedStablecoin.symbol}
              </span>
            </div>

            <div className="bg-[#2C393F] rounded-xl p-3 sm:p-4 border border-[#00BCD4]/20 
              hover:border-[#00BCD4]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center mb-3">
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg 
                  bg-[#37474F] hover:bg-[#435761] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
                    <FiDollarSign className="w-4 h-4 text-[#00BCD4]" />
                  </div>
                  <span className="text-white font-medium">{selectedBond.pairedStablecoin.symbol}</span>
                </button>
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
                <span className="text-gray-400 truncate mr-2">{selectedBond.pairedStablecoin.name}</span>
                <span className="text-[#00BCD4] whitespace-nowrap">≈ {selectedBond.cost}</span>
              </div>
            </div>
          </div>

          {/* Mint Button */}
          <button 
            onClick={handleMint}
            className="w-full py-3 sm:py-4 bg-[#00BCD4] text-white text-sm sm:text-base rounded-xl font-medium 
              hover:bg-[#00BCD4]/80 transition-colors shadow-[0_0_20px_rgba(0,188,212,0.3)] 
              hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]"
          >
            Mint {selectedBond.pairedStablecoin.symbol}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintComponent;