"use client"

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';

interface WalletLoginProps {
    onConnect: (
        publicKey: string, 
        signMessage: (message: Uint8Array) => Promise<Uint8Array>
      ) => Promise<void>;
}

const WalletLogin: React.FC<WalletLoginProps> = ({ onConnect }) => {
  const { connected, publicKey, signMessage } = useWallet();
  const { setVisible } = useWalletModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <WalletMultiButton 
          className="w-full !bg-[#2C393F] !border !border-[#00BCD4]/30 
            hover:!border-[#00BCD4] !rounded-lg !py-3 !font-medium
            !transition-all !duration-200"
        />
        {isLoading && (
          <FiLoader className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#00BCD4]" />
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
};

export default WalletLogin;