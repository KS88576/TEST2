"use client"

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LaunchModalProps } from '@/types';
import { LaunchButton } from './LaunchButton';

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

  const isFormValid = formData.name && formData.symbol && formData.currency;

  return (
    <DialogContent className="bg-[#37474F] border-[#00BCD4] text-white sm:max-w-[95%] md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
      <DialogHeader className="pt-4 px-4">
        <DialogTitle className="text-xl font-bold text-center">Launch New Stablecoin</DialogTitle>
      </DialogHeader>
      
      <div className="px-4 pb-4">
        <p className="text-gray-300 text-sm text-center mb-4">
          Enter the details for your new stablecoin token
        </p>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Token Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., USD Plus"
              className="w-full p-2.5 rounded-lg bg-[#37474F]/50 border border-[#00BCD4]/30 
              focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 text-white placeholder-gray-400
              transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Token Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="e.g., USD+"
              className="w-full p-2.5 rounded-lg bg-[#37474F]/50 border border-[#00BCD4]/30 
              focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 text-white placeholder-gray-400
              transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Target Fiat Currency</label>
            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="e.g., USD"
              className="w-full p-2.5 rounded-lg bg-[#37474F]/50 border border-[#00BCD4]/30 
              focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 text-white placeholder-gray-400
              transition-all duration-200"
            />
          </div>

          <LaunchButton
            name={formData.name}
            symbol={formData.symbol}
            currency={formData.currency}
            disabled={!isFormValid}
            onSuccess={() => {
              // Handle success - maybe close modal or reset form
              setFormData({ name: '', symbol: '', currency: '' });
            }}
          />
        </form>
      </div>
    </DialogContent>
  );
};

export default LaunchModal;