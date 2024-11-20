"use client"

import React, { useState } from 'react';
import { FiSearch, FiArrowRight, FiArrowLeft, FiPlus } from 'react-icons/fi';
import { Dialog, DialogTrigger, DialogPortal } from "@/components/ui/dialog";
import { Token } from '@/types';
import NewsFeed from '../NewsFeed';
import LaunchModal from './LaunchModal';
import TokenCard from './TokenCard';
import { useAuth } from '@/contexts/AuthContext';

interface LaunchTabProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
}

const LaunchTab: React.FC<LaunchTabProps> = ({ tokens = [], onSelectToken }) => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { requireAuth } = useAuth();

  const filteredTokens = tokens?.filter(token => 
    token?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token?.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  const handleLaunchClick = () => {
    requireAuth(() => {
      // This code will only run if the user is authenticated
      document.querySelector<HTMLButtonElement>('[data-dialog-trigger="launch"]')?.click();
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
      <Dialog>
          <DialogTrigger asChild>
            <button 
              data-dialog-trigger="launch"
              className="hidden"
            />
          </DialogTrigger>
          <DialogPortal>
            <LaunchModal />
          </DialogPortal>
        </Dialog>

        <button
          onClick={handleLaunchClick}
          className="w-full sm:w-auto px-6 py-3 bg-[#00BCD4] text-white rounded-lg 
            hover:bg-[#00BCD4]/80 transition-colors 
            shadow-[0_0_20px_rgba(0,188,212,0.3)] hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]
            flex items-center justify-center space-x-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Launch Stablecoin</span>
        </button>

        <div className="relative w-full sm:w-auto sm:min-w-[320px] lg:min-w-[400px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search token or address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#37474F]/50 border border-[#00BCD4]/30 
            focus:border-[#00BCD4] text-white placeholder-gray-400 focus:outline-none
            transition-colors duration-200"
          />
        </div>
      </div>

      {/* News Feed Section */}
      <div className="w-full overflow-x-hidden">
        <NewsFeed />
      </div>

      {/* Tokens Grid Section */}
      <div className="space-y-6">
        <h2 className="text-white text-xl font-bold px-1">Popular</h2>
        {filteredTokens.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredTokens.map((token, i) => (
              <TokenCard key={i} token={token} onSelect={onSelectToken} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#37474F]/30 rounded-lg">
            <p className="text-gray-400">No tokens found</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredTokens.length > 0 && (
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#37474F] border border-[#00BCD4]/30 rounded-lg text-white 
            hover:border-[#00BCD4] transition-colors flex items-center space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] justify-center"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={filteredTokens.length < 6}
            className="px-4 py-2 bg-[#37474F] border border-[#00BCD4]/30 rounded-lg text-white 
            hover:border-[#00BCD4] transition-colors flex items-center space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] justify-center"
          >
            <span className="hidden sm:inline">Next</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LaunchTab;