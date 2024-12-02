// components/auth/login/WalletLogin.tsx
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { FiLoader, FiCheck } from 'react-icons/fi';
import { useToast } from '@/hooks/useToast';

interface WalletLoginProps {
  onConnect: (publicKey: string, signMessage: (message: Uint8Array) => Promise<Uint8Array>) => Promise<void>;
}

const WalletLogin: React.FC<WalletLoginProps> = ({ onConnect }) => {
  const { connected, connecting, publicKey, signMessage } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (connected && publicKey && signMessage) {
      handleConnect();
    }
  }, [connected, publicKey, signMessage]);

  const handleConnect = async () => {
    if (!publicKey || !signMessage) return;
    
    setError(null);
    setIsLoading(true);

    try {
      await onConnect(publicKey.toString(), signMessage);
      toast.success('Wallet connected successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      toast.error('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
      {!connected ? (
          <WalletMultiButton 
            className="w-full !bg-[#2C393F] !border !border-[#00BCD4]/30 
              hover:!border-[#00BCD4] !rounded-lg !py-3 !px-4 !h-auto
              !font-medium !transition-all !duration-200"
          />
        ) : (
          <div className="flex items-center justify-between p-3 bg-[#2C393F] 
            border border-[#00BCD4]/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-green-500/20 
                flex items-center justify-center">
                <FiCheck className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-sm text-gray-300">
                Wallet Connected
              </span>
            </div>
            {publicKey && ( 
              <span className="text-sm text-gray-400">
                {`${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`}
              </span>
            )}
          </div>
        )}
        {(connecting || isLoading) && (
          <FiLoader className="absolute right-3 top-1/2 -translate-y-1/2 
            w-5 h-5 animate-spin text-[#00BCD4]" />
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}
    </div>
  );
};

export default WalletLogin;