"use client"

import React, { useState } from 'react';
import { FiMail, FiLoader } from 'react-icons/fi';

interface EmailLoginProps {
  onSubmit: (email: string) => Promise<void>;
}

const EmailLogin: React.FC<EmailLoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await onSubmit(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-[#2C393F] border border-[#00BCD4]/30 
                rounded-lg focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 
                text-white placeholder-gray-400 transition-all duration-200"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full p-3 bg-[#00BCD4] rounded-lg font-medium text-white
            hover:bg-[#00BCD4]/80 transition-all duration-300 
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-[0_0_20px_rgba(0,188,212,0.3)] 
            hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]
            flex items-center justify-center space-x-2"
        >
          {isLoading && <FiLoader className="w-4 h-4 animate-spin" />}
          <span>Continue with Email</span>
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
};

export default EmailLogin;