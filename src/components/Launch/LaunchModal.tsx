"use client"

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LaunchModalProps } from '@/types';

const LaunchModal: React.FC<LaunchModalProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    currency: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle token launch logic here
    console.log('Launching token:', formData);
  };

  return (
    <DialogContent className="bg-[#37474F] border-[#00BCD4] text-white sm:max-w-md md:max-w-lg lg:max-w-xl">
      <DialogHeader className="pt-6 px-6">
        <DialogTitle className="text-2xl font-bold text-center">Launch New Stablecoin</DialogTitle>
      </DialogHeader>
      
      <div className="px-6 pb-6">
        <p className="text-gray-300 text-sm text-center mb-6">
          Enter the details for your new stablecoin token
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Token Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., USD Plus"
              className="w-full p-3 rounded-lg bg-[#37474F]/50 border border-[#00BCD4]/30 
              focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 text-white placeholder-gray-400
              transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Token Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="e.g., USD+"
              className="w-full p-3 rounded-lg bg-[#37474F]/50 border border-[#00BCD4]/30 
              focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 text-white placeholder-gray-400
              transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Target Fiat Currency</label>
            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="e.g., USD"
              className="w-full p-3 rounded-lg bg-[#37474F]/50 border border-[#00BCD4]/30 
              focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 text-white placeholder-gray-400
              transition-all duration-200"
            />
          </div>

          <button 
            type="submit"
            className="w-full p-3 mt-6 bg-[#00BCD4] rounded-lg hover:bg-[#00BCD4]/80 
            transition-all duration-300 font-medium
            shadow-[0_0_20px_rgba(0,188,212,0.3)] hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]"
          >
            Launch Token
          </button>
        </form>
      </div>
    </DialogContent>
  );
};

export default LaunchModal;