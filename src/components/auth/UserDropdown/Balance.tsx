// components/auth/UserDropdown/Balance.tsx
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useState, useEffect } from 'react';
import { FiDollarSign, FiRefreshCw } from 'react-icons/fi';

interface BalanceProps {
  walletAddress: string;
}

const Balance: React.FC<BalanceProps> = ({ walletAddress }) => {
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usdValue, setUsdValue] = useState<number | null>(null);

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      const publicKey = new PublicKey(walletAddress);
      const lamports = await connection.getBalance(publicKey);
      const solBalance = lamports / 1e9; // Convert lamports to SOL
      setBalance(solBalance);

      // Fetch SOL price in USD (you might want to use a proper price feed)
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const data = await response.json();
      const solPrice = data.solana.usd;
      setUsdValue(solBalance * solPrice);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [walletAddress]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">Balance</p>
        <button
          onClick={fetchBalance}
          disabled={isLoading}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiRefreshCw className={`w-4 h-4 text-gray-400 
            ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {balance !== null ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-white">
              {balance.toFixed(4)} SOL
            </p>
            {usdValue !== null && (
              <p className="text-sm text-gray-400">
                ≈ ${usdValue.toFixed(2)} USD
              </p>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-[#00BCD4]/20 
            flex items-center justify-center">
            <FiDollarSign className="w-5 h-5 text-[#00BCD4]" />
          </div>
        </div>
      ) : (
        <div className="animate-pulse">
          <div className="h-6 w-24 bg-white/10 rounded mb-2" />
          <div className="h-4 w-16 bg-white/10 rounded" />
        </div>
      )}
    </div>
  );
};

export default Balance;