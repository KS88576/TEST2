"use client"

import React from 'react';
import { FiStar, FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface FavoriteToken {
  symbol: string;
  name: string;
  price: string;
  change: number;
  currency: string;
}

interface FavoritesCardProps {
  favorites: FavoriteToken[];
  onRemoveFavorite?: (symbol: string) => void;
}

const FavoritesCard: React.FC<FavoritesCardProps> = ({ 
  favorites = [
    { symbol: 'EUR+', name: 'Euro Plus', price: '1.08', change: 2.5, currency: '€' },
    { symbol: 'MXN+', name: 'Peso Plus', price: '17.24', change: -1.2, currency: '₱' },
    { symbol: 'JPY+', name: 'Yen Plus', price: '149.32', change: 0.8, currency: '¥' },
  ],
  onRemoveFavorite 
}) => {
  return (
    <div className="bg-[#37474F]/90 rounded-lg p-6 border border-[#00BCD4]/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FiStar className="w-5 h-5 text-[#00BCD4]" />
          <h3 className="text-lg font-bold text-white">Favorites</h3>
        </div>
        <span className="text-sm text-gray-400">{favorites.length} tokens</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.map((token) => (
          <div 
            key={token.symbol}
            className="group p-4 bg-[#2C393F] rounded-lg border border-[#00BCD4]/20 
              hover:border-[#00BCD4]/40 transition-all duration-300
              hover:shadow-[0_0_20px_rgba(0,188,212,0.15)]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <FiDollarSign className="w-4 h-4 text-[#00BCD4]" />
                <span className="text-white font-medium">{token.symbol}</span>
              </div>
              <button 
                onClick={() => onRemoveFavorite?.(token.symbol)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiStar className="w-4 h-4 text-[#00BCD4] fill-current" />
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-2">{token.name}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">
                {token.currency}{token.price}
              </span>
              <div className={`flex items-center space-x-1 
                ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                {token.change >= 0 ? (
                  <FiTrendingUp className="w-3 h-3" />
                ) : (
                  <FiTrendingDown className="w-3 h-3" />
                )}
                <span className="text-sm">
                  {Math.abs(token.change)}%
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 pt-3 border-t border-[#00BCD4]/10 grid grid-cols-2 gap-2">
              <button className="px-2 py-1 text-sm text-white hover:bg-[#00BCD4]/10 
                rounded transition-colors">
                Buy
              </button>
              <button className="px-2 py-1 text-sm text-white hover:bg-[#00BCD4]/10 
                rounded transition-colors">
                Sell
              </button>
            </div>
          </div>
        ))}

        {/* Add New Favorite */}
        <button className="p-4 bg-[#2C393F] rounded-lg border border-dashed border-[#00BCD4]/20 
          hover:border-[#00BCD4]/40 transition-all duration-300 flex items-center justify-center
          text-[#00BCD4] hover:bg-[#00BCD4]/5"
        >
          <FiStar className="w-5 h-5 mr-2" />
          <span>Add Favorite</span>
        </button>
      </div>

      {/* Token Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-[#2C393F] rounded-lg">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Best Performer</p>
          <p className="text-white font-medium mt-1">EUR+</p>
          <p className="text-green-400 text-sm">+2.5%</p>
        </div>
        <div className="text-center border-x border-[#00BCD4]/20">
          <p className="text-gray-400 text-sm">Average Yield</p>
          <p className="text-white font-medium mt-1">5.8%</p>
          <p className="text-[#00BCD4] text-sm">APY</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">Total Value</p>
          <p className="text-white font-medium mt-1">$12,345</p>
          <p className="text-[#00BCD4] text-sm">USD</p>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;