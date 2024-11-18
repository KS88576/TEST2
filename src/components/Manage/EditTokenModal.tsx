"use client"

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Token } from '@/types';
import { FiSave, FiX } from 'react-icons/fi';

interface EditTokenModalProps {
  token: Token;
  onSave: (updatedToken: Token) => void;
  onClose: () => void;
}

const EditTokenModal: React.FC<EditTokenModalProps> = ({ token, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: token.name,
    symbol: token.symbol
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...token, ...formData });
    onClose();
  };

  return (
    <DialogContent className="bg-[#37474F] border-[#00BCD4] text-white w-[90vw] max-w-[95vw] sm:max-w-md 
      rounded-lg overflow-hidden">
      <DialogHeader className="pt-4 sm:pt-6 px-4 sm:px-6 relative">
        <DialogTitle className="text-lg sm:text-2xl font-bold text-center sm:text-left">
          Edit Token
        </DialogTitle>
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-[#2C393F] rounded-full transition-colors"
        >
          <FiX className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 p-4 sm:p-6">
        <div className="space-y-2 sm:space-y-3">
          <label className="text-sm font-medium text-gray-300 block">Token Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2.5 sm:p-3 rounded-lg bg-[#2C393F] border border-[#00BCD4]/30 
              focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 text-white text-sm sm:text-base
              placeholder-gray-400 transition-all duration-200"
            placeholder="Enter token name"
          />
        </div>

        <div className="space-y-2 sm:space-y-3">
          <label className="text-sm font-medium text-gray-300 block">Token Symbol</label>
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
            className="w-full p-2.5 sm:p-3 rounded-lg bg-[#2C393F] border border-[#00BCD4]/30 
              focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 text-white text-sm sm:text-base
              placeholder-gray-400 transition-all duration-200"
            placeholder="Enter token symbol"
          />
        </div>

        <div className="pt-2 sm:pt-3">
          <button
            type="submit"
            className="w-full p-2.5 sm:p-3 bg-[#00BCD4] rounded-lg hover:bg-[#00BCD4]/80 
              transition-colors shadow-[0_0_20px_rgba(0,188,212,0.3)] 
              hover:shadow-[0_0_30px_rgba(0,188,212,0.5)] flex items-center justify-center 
              space-x-2 text-sm sm:text-base font-medium"
          >
            <FiSave className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </DialogContent>
  );
};

export default EditTokenModal;