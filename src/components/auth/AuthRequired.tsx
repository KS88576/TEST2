// components/auth/AuthRequired.tsx
import React from 'react';
import { FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

interface AuthRequiredProps {
  message?: string;
}

export const AuthRequired: React.FC<AuthRequiredProps> = ({ 
  message = "Please login to access this content."
}) => {
  const { requireAuth } = useAuth();

  const handleLoginClick = () => {
    requireAuth(() => {
      console.log('User authenticated');
    });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#37474F]/90 rounded-2xl border border-[#00BCD4]/30 
        backdrop-blur-xl shadow-[0_0_50px_rgba(0,188,212,0.15)]
        p-8 space-y-6 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BCD4]/0 via-[#00BCD4]/50 to-[#00BCD4]/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BCD4]/0 via-[#00BCD4]/50 to-[#00BCD4]/0"></div>
        
        {/* Lock Icon with glowing effect */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto bg-[#2C393F] rounded-full flex items-center justify-center
            border border-[#00BCD4]/30 shadow-[0_0_20px_rgba(0,188,212,0.2)]">
            <FiLock className="w-8 h-8 text-[#00BCD4]" />
          </div>
          <div className="absolute inset-0 bg-[#00BCD4]/10 blur-xl rounded-full"></div>
        </div>

        {/* Text content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
          <p className="text-gray-400 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Login button */}
        <button
          onClick={handleLoginClick}
          className="group relative w-full py-3 bg-[#00BCD4] text-white rounded-xl font-medium 
            hover:bg-[#00BCD4]/80 transition-all duration-300
            shadow-[0_0_20px_rgba(0,188,212,0.3)] 
            hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]
            flex items-center justify-center space-x-2"
        >
          <span>Continue to Login</span>
          <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00BCD4]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00BCD4]/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};