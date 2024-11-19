"use client"

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiX } from 'react-icons/fi';
import EmailLogin from './EmailLogin';
import WalletLogin from './WalletLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const handleEmailLogin = async (email: string) => {
    try {
      const response = await fetch('/api/auth/signin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const { token, user } = await response.json();
      
      // Store token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      onClose();
    } catch (error) {
      throw error;
    }
  };

  const handleWalletLogin = async (
    publicKey: string, 
    signMessage: (message: Uint8Array) => Promise<Uint8Array>
  ) => {
    try {
      // Generate message to sign
      const messageString = `Sign this message to verify your wallet ownership: ${Date.now()}`;
      const message = new TextEncoder().encode(messageString);

      // Get signature
      const signature = await signMessage(message);

      // Send to backend
      const response = await fetch('/api/auth/signin/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: publicKey,
          signature: Buffer.from(signature).toString('base64'),
          signatureMessage: messageString // Send the original message string
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const { token, user } = await response.json();
      
      // Store token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      onClose();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#37474F]/95 border-[#00BCD4] text-white w-[90vw] max-w-[95vw] sm:max-w-[400px] 
        rounded-xl backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,188,212,0.15)]">
        <DialogHeader className="pt-4 sm:pt-5 px-4 sm:px-5 relative">
          <DialogTitle className="text-lg sm:text-xl font-bold text-center">
            Login to Stable.fun
          </DialogTitle>
          <button 
            onClick={onClose}
            className="absolute right-3 top-3 p-1.5 hover:bg-[#2C393F] rounded-full transition-colors"
          >
            <FiX className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </DialogHeader>

        <div className="p-4 sm:p-5 space-y-6">
          {/* Important Notice */}
          <div className="bg-[#2C393F] border border-[#00BCD4]/30 rounded-lg p-3">
            <p className="text-xs sm:text-sm text-[#00BCD4] leading-relaxed">
              Choose how you want to access your account. You can use either email or connect your wallet.
            </p>
          </div>

          {/* Email Login Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-200">Login with Email</h3>
            <EmailLogin onSubmit={handleEmailLogin} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px bg-[#00BCD4]/20 flex-1" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px bg-[#00BCD4]/20 flex-1" />
          </div>

          {/* Wallet Login Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-200">Login with Wallet</h3>
            <WalletLogin onConnect={handleWalletLogin} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;