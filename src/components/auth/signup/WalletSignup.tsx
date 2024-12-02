// components/auth/signup/WalletSignup.tsx
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { AuthButton } from '../shared/AuthButton';
import { useToast } from '@/hooks/useToast';
import { FiArrowLeft } from 'react-icons/fi';

interface WalletSignupProps {
  onBack: () => void;
  onClose: () => void;
}

const WalletSignup: React.FC<WalletSignupProps> = ({ onBack, onClose }) => {
  const { connected, publicKey, signMessage } = useWallet();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!publicKey || !signMessage) return;

    try {
      setIsLoading(true);
      
      // Generate message to sign
      const messageString = `Sign this message to verify your wallet ownership: ${Date.now()}`;
      const message = new TextEncoder().encode(messageString);
      
      // Get signature
      const signature = await signMessage(message);

      // Send to backend
      const response = await fetch('/api/auth/signup/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
          signature: Buffer.from(signature).toString('base64'),
          signatureMessage: messageString,
          username,
          email: email || undefined
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const { token, user } = await response.json();
      
      // Store user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Account created successfully');

      onClose();
    } catch (error) {
      toast.error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-sm text-gray-400
          hover:text-white transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="space-y-4">
        {!connected ? (
          <div>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-400">
                Connect your wallet to continue
              </p>
            </div>
            <WalletMultiButton 
              className="!w-full !bg-[#2C393F] !border !border-[#00BCD4]/30 
                hover:!border-[#00BCD4] !rounded-lg !py-3 !px-4 !font-medium
                !transition-all !duration-200"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full p-3 bg-[#2C393F] border border-[#00BCD4]/30
                  rounded-lg focus:border-[#00BCD4] text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 bg-[#2C393F] border border-[#00BCD4]/30
                  rounded-lg focus:border-[#00BCD4] text-white"
              />
            </div>

            <AuthButton
              onClick={handleSubmit}
              disabled={!username || isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </AuthButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSignup;
