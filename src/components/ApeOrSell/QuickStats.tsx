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
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs sm:text-sm">
          {/* Forex Pairs */}
          <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
            {['USD/MXN', 'GBP/USD', 'USD/TRY', 'EUR/USD'].map((symbol) => (
              <div key={symbol} className={`${isLoading ? 'animate-pulse' : ''}`}>
                <span className="text-gray-400">{symbol}:</span>
                {error ? (
                  <span className="text-red-400 ml-1 sm:ml-2">Error: {error}</span>
                ) : isLoading ? (
                  <span className="text-gray-400 ml-1 sm:ml-2">Loading...</span>
                ) : prices[symbol] ? (
                  <div className="inline-flex items-center flex-wrap">
                    <span className={`ml-1 sm:ml-2 ${
                      prices[symbol].change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatPrice(prices[symbol].price)}
                      <span className="whitespace-nowrap">
                        {' ('}
                        {prices[symbol].change24h >= 0 ? '+' : ''}
                        {formatChange(prices[symbol].change24h)}
                        {'%)'}
                      </span>
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 ml-1 sm:ml-2">
                    Unavailable
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <div>
              <span className="text-gray-400">Total APY:</span>
              <span className="text-white ml-1 sm:ml-2">19.4%</span>
            </div>
            <div>
              <span className="text-gray-400">24h Volume:</span>
              <span className="text-[#00BCD4] ml-1 sm:ml-2">$24.5M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;