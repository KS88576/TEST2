"use client"

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaXTwitter, FaDiscord } from 'react-icons/fa6';
import { SiFantom, SiSolana } from 'react-icons/si';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
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

        <div className="p-4 sm:p-5 space-y-4">
          {/* Important Notice */}
          <div className="bg-[#2C393F] border border-[#00BCD4]/30 rounded-lg p-3">
            <p className="text-xs sm:text-sm text-[#00BCD4] leading-relaxed">
              Your stable.fun account is tied to your social account email. Changing it creates a new account.
            </p>
          </div>

          {/* Login with Socials */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-200">Login with Socials</h3>
            <div className="grid gap-2">
              <button className="flex items-center w-full p-2.5 bg-white hover:bg-gray-100 
                rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]
                text-black text-sm font-medium">
                <FcGoogle className="w-4 h-4 mr-2.5" />
                <span>Continue with Google</span>
              </button>

              <button className="flex items-center w-full p-2.5 bg-black hover:bg-gray-900 
                rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]
                text-white text-sm font-medium">
                <FaXTwitter className="w-4 h-4 mr-2.5" />
                <span>Continue with X</span>
              </button>

              <button className="flex items-center w-full p-2.5 bg-[#5865F2] hover:bg-[#4752C4] 
                rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]
                text-white text-sm font-medium">
                <FaDiscord className="w-4 h-4 mr-2.5" />
                <span>Continue with Discord</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px bg-[#00BCD4]/20 flex-1" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px bg-[#00BCD4]/20 flex-1" />
          </div>

          {/* Login with Wallet */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-200">Login with Wallet</h3>
            <div className="grid gap-2">
              <button className="flex items-center w-full p-2.5 bg-[#AB9FF2] hover:bg-[#9584E7] 
                rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]
                text-white text-sm font-medium group">
                <div className="w-4 h-4 mr-2.5 relative">
                  <Image
                    src="/phantom.svg"
                    alt="Phantom"
                    width={50}
                    height={50}
                  />
                </div>
                <span>Connect Phantom</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                    Popular
                  </span>
                </div>
              </button>

              <button className="flex items-center w-full p-2.5 bg-[#FE823C]
                hover:from-[#FE9154] hover:to-[#E34B84]
                rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]
                text-white text-sm font-medium">
                <div className="w-4 h-4 mr-2.5 relative">
                  <Image
                    src="/solflare-white.svg"
                    alt="Solflare"
                    width={50}
                    height={50}
                  />
                </div>
                <span>Connect Solflare</span>
              </button>

              <button className="flex items-center w-full p-2.5 bg-[#000000] hover:bg-[#1A1A1A]
                rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]
                text-white text-sm font-medium">
                <div className="w-4 h-4 mr-2.5 relative">
                  <Image
                    src="/backpack.svg"
                    alt="Backpack"
                    width={50}
                    height={50}
                  />
                </div>
                <span>Connect Backpack</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;