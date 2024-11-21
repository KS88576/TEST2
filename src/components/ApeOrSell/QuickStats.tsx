// components/QuickStats.tsx
"use client"

import { useEffect } from 'react';
import { usePriceStore, forexPriceService } from '@/lib/services/forexPriceService';

const QuickStats = () => {
  const { prices, isLoading, error } = usePriceStore();

  useEffect(() => {
    forexPriceService.initialize();

    return () => {
      forexPriceService.disconnect();
    };
  }, []);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  };

  const formatChange = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className="bg-[#2C393F]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm">
          <div className="flex items-center space-x-8">
            {['USD/MXN', 'GBP/USD', 'USD/TRY', 'EUR/USD'].map((symbol) => (
              <div key={symbol} className={isLoading ? 'animate-pulse' : ''}>
                <span className="text-gray-400">{symbol}:</span>
                {error ? (
                  <span className="text-red-400 ml-2">Error: {error}</span>
                ) : isLoading ? (
                  <span className="text-gray-400 ml-2">Loading...</span>
                ) : prices[symbol] ? (
                  <div className="inline-flex items-center">
                    <span className={`ml-2 ${
                      prices[symbol].change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatPrice(prices[symbol].price)}
                      {' ('}
                      {prices[symbol].change24h >= 0 ? '+' : ''}
                      {formatChange(prices[symbol].change24h)}
                      {'%)'}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 ml-2">
                    Unavailable
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-gray-400">Total APY:</span>
              <span className="text-white ml-2">19.4%</span>
            </div>
            <div>
              <span className="text-gray-400">24h Volume:</span>
              <span className="text-[#00BCD4] ml-2">$24.5M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;