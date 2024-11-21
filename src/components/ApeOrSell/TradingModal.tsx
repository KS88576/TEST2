import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FiChevronDown, FiDollarSign, FiRepeat } from "react-icons/fi";

interface Token {
    name: string;
    symbol: string;
    logo?: string;
    decimals?: number;  
    price?: string;
  }
  
  interface TradingModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'buy' | 'sell';
    token: Token;
  }

const stablecoins: Token[] = [
  { name: "USD Stablecoin", symbol: "USD+", decimals: 6 },
  { name: "USDT", symbol: "USDT", decimals: 6 },
  { name: "USDC", symbol: "USDC", decimals: 6 },
];

const TradingModal: React.FC<TradingModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'buy',
  token
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>(initialTab);
  const [amount, setAmount] = useState<string>(activeTab === 'buy' ? '1' : '');
  const [selectedStablecoin, setSelectedStablecoin] = useState<Token>(stablecoins[0]);
  const [receiveAmount, setReceiveAmount] = useState<string>('');

  const handleAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d{0,6}$/.test(value)) {
      setAmount(value);
      // Calculate receive amount based on price (mock calculation)
      const calculatedAmount = value === '' ? '' : 
        (parseFloat(value) * (parseFloat(token.price || '0'))).toFixed(6);
      setReceiveAmount(calculatedAmount);
    }
  };

  useEffect(() => {
    if (activeTab === 'buy') {
      handleAmountChange('1');
    } else {
      setAmount('');
      setReceiveAmount('');
    }
  }, [activeTab]);

  const handleTrade = () => {
    console.log(`Executing ${activeTab} trade...`);
    // Add your trade execution logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="w-full max-w-md bg-[#37474F]/90 border border-[#00BCD4]/30 
        backdrop-blur-xl shadow-[0_0_50px_rgba(0,188,212,0.15)] p-0">
        {/* Tabs */}
        <div className="flex border-b border-[#00BCD4]/20">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors
              ${activeTab === 'buy' 
                ? 'text-[#00BCD4] border-b-2 border-[#00BCD4]' 
                : 'text-gray-400 hover:text-[#00BCD4]/70'}`}
          >
            Buy {token.symbol}
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors
              ${activeTab === 'sell' 
                ? 'text-[#00BCD4] border-b-2 border-[#00BCD4]' 
                : 'text-gray-400 hover:text-[#00BCD4]/70'}`}
          >
            Sell {token.symbol}
          </button>
        </div>

        {/* Trading Form */}
        <div className="p-6 space-y-6">
          {/* Input Amount Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">
                {activeTab === 'buy' ? "You're Paying" : "You're Selling"}
              </span>
              <span className="text-gray-400 text-sm">
                Balance: 1000.00
              </span>
            </div>
            
            <div className="bg-[#2C393F] rounded-xl p-4 border border-[#00BCD4]/20 
              hover:border-[#00BCD4]/40 transition-all">
              <div className="flex justify-between items-center mb-3">
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg 
                  bg-[#37474F] hover:bg-[#435761] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
                    <FiDollarSign className="w-4 h-4 text-[#00BCD4]" />
                  </div>
                  <span className="text-white font-medium">
                    {activeTab === 'buy' ? selectedStablecoin.symbol : token.symbol}
                  </span>
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.000000"
                  className="bg-transparent text-right text-white text-xl font-medium 
                    focus:outline-none w-[180px]"
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  {activeTab === 'buy' ? selectedStablecoin.name : token.name}
                </span>
                <span className="text-[#00BCD4]">≈ $1000.00</span>
              </div>
            </div>
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center -my-2">
            <div className="bg-[#2C393F] p-2 rounded-lg border border-[#00BCD4]/30">
              <div className="bg-[#37474F] p-2 rounded-lg cursor-pointer hover:bg-[#435761] 
                transition-colors group">
                <FiRepeat className="w-5 h-5 text-[#00BCD4] group-hover:rotate-180 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Receive Amount Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">
                {activeTab === 'buy' ? "You'll Receive" : "You'll Get"}
              </span>
              <span className="text-gray-400 text-sm">
                Rate: 1 {token.symbol} = ${token.price}
              </span>
            </div>
            
            <div className="bg-[#2C393F] rounded-xl p-4 border border-[#00BCD4]/20 
              hover:border-[#00BCD4]/40 transition-all">
              <div className="flex justify-between items-center mb-3">
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg 
                  bg-[#37474F] hover:bg-[#435761] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
                    <FiDollarSign className="w-4 h-4 text-[#00BCD4]" />
                  </div>
                  <span className="text-white font-medium">
                    {activeTab === 'buy' ? token.symbol : selectedStablecoin.symbol}
                  </span>
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <input
                  type="text"
                  value={receiveAmount}
                  readOnly
                  placeholder="0.000000"
                  className="bg-transparent text-right text-white text-xl font-medium 
                    focus:outline-none w-[180px]"
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  {activeTab === 'buy' ? token.name : selectedStablecoin.name}
                </span>
                <span className="text-[#00BCD4]">≈ $1000.00</span>
              </div>
            </div>
          </div>

          {/* Trade Button */}
          <button
            onClick={handleTrade}
            className="w-full py-4 bg-[#00BCD4] text-white rounded-xl font-medium 
              hover:bg-[#00BCD4]/80 transition-colors shadow-[0_0_20px_rgba(0,188,212,0.3)] 
              hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]"
          >
            {activeTab === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradingModal;