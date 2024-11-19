// components/auth/UserDropdown/USDCBalance.tsx
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // Mainnet USDC

interface USDCBalanceProps {
  walletAddress: string;
}

const USDCBalance: React.FC<USDCBalanceProps> = ({ walletAddress }) => {
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUSDCBalance = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const publicKey = new PublicKey(walletAddress);
      
      // Find USDC token account
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: USDC_MINT }
      );

      if (tokenAccounts.value.length > 0) {
        const usdcAccount = tokenAccounts.value[0];
        const amount = usdcAccount.account.data.parsed.info.tokenAmount.uiAmount;
        setBalance(amount);
      } else {
        setBalance(0);
      }
    } catch (err) {
      console.error('Error fetching USDC balance:', err);
      setError('Failed to fetch USDC balance');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUSDCBalance();
    // Set up interval to refresh balance
    const interval = setInterval(fetchUSDCBalance, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, [walletAddress]);

  return (
    <div className="mt-2 p-3 bg-[#37474F] rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">USDC Balance</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchUSDCBalance}
            disabled={isLoading}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <FiRefreshCw className={`w-4 h-4 text-gray-400 
              ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <img src="/usdc-logo.svg" alt="USDC" className="w-5 h-5" />
        </div>
      </div>
      
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : isLoading ? (
        <div className="animate-pulse">
          <div className="h-6 w-24 bg-white/10 rounded" />
        </div>
      ) : (
        <div>
          <p className="text-white font-medium text-lg">
            ${balance?.toFixed(2) ?? '0.00'} USDC
          </p>
          <p className="text-xs text-gray-400 mt-1">
            ≈ ${balance?.toFixed(2)} USD
          </p>
        </div>
      )}
    </div>
  );
};

export default USDCBalance;