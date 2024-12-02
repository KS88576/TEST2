"use client"

import React, { useState } from 'react';
import { FiDollarSign, FiSend, FiThumbsUp } from 'react-icons/fi';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TokenDetailsModalProps } from '@/types';

const TokenDetailsModal: React.FC<TokenDetailsModalProps> = ({ token }) => {
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding comment:', newComment);
    setNewComment('');
  };

  return (
    <DialogContent 
      className="bg-[#37474F] border-[#00BCD4]/30 p-0 
        sm:max-w-2xl w-[calc(100%-2rem)] sm:w-full
        overflow-hidden rounded-xl
        fixed sm:fixed
        bottom-0 sm:bottom-auto left-0 right-0 
        sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
        h-[90vh] sm:h-[85vh]
        flex flex-col
        transition-transform duration-300"
    >
    <DialogHeader className="p-4 border-b border-[#00BCD4]/20 bg-[#2C393F]/50 backdrop-blur-sm sticky top-0 z-10">
        <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
            <FiDollarSign className="w-6 h-6 text-[#00BCD4]" />
          </div>
          <span className="text-white">{token?.name}</span>
          <span className="text-gray-400 text-base ml-2">({token?.symbol})</span>
        </DialogTitle>
      </DialogHeader>

    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00BCD4]/10 hover:scrollbar-thumb-[#00BCD4]/20 scrollbar-track-transparent">
      <div className="space-y-6 p-4">
        {/* Token Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#2C393F] p-4 rounded-lg border border-[#00BCD4]/30 hover:border-[#00BCD4]/50 transition-colors">
            <p className="text-gray-400">Price</p>
            <p className="text-2xl text-[#00BCD4] font-bold">${token?.price}</p>
          </div>
          <div className="bg-[#2C393F] p-4 rounded-lg border border-[#00BCD4]/30 hover:border-[#00BCD4]/50 transition-colors">
            <p className="text-gray-400">APY</p>
            <p className="text-2xl text-white font-bold">{token?.apy}</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-[#2C393F] p-3 rounded-lg border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">24h Volume</p>
            <p className="text-white">{token?.volume24h}</p>
          </div>
          <div className="bg-[#2C393F] p-3 rounded-lg border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">TVL</p>
            <p className="text-white">{token?.tvl}</p>
          </div>
          <div className="bg-[#2C393F] p-3 rounded-lg border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">Market Cap</p>
            <p className="text-white">{token?.marketCap}</p>
          </div>
          <div className="bg-[#2C393F] p-3 rounded-lg border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">Total Supply</p>
            <p className="text-white">{token?.supply}</p>
          </div>
          <div className="bg-[#2C393F] p-3 rounded-lg border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">Holders</p>
            <p className="text-white">{token?.holders?.toLocaleString()}</p>
          </div>
          <div className="bg-[#2C393F] p-3 rounded-lg border border-[#00BCD4]/30">
            <p className="text-gray-400 text-sm">Paired Bond</p>
            <p className="text-white">{token?.pairedBond}</p>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center text-white">
            <FiThumbsUp className="w-5 h-5 mr-2 text-[#00BCD4]" />
            Community Feedback
          </h3>
          
          <div className="space-y-3">
            {token?.comments?.map((comment, i) => (
              <div key={i} className="bg-[#2C393F] p-3 rounded-lg border border-[#00BCD4]/30">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
                    <span className="text-[#00BCD4] text-sm">{comment.user[0]}</span>
                  </div>
                  <p className="text-sm text-gray-400">{comment.user}</p>
                </div>
                <p className="text-white pl-8">{comment.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 rounded-lg bg-[#2C393F] border border-[#00BCD4]/30 
              focus:border-[#00BCD4] text-white placeholder-gray-400 pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#00BCD4] 
              hover:text-white transition-colors"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </form>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default TokenDetailsModal;