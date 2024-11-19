// components/auth/login/LoginModal.tsx
import { AuthModal } from '../shared/AuthModal';
import { useToast } from '@/hooks/useToast';
import EmailLogin from './EmailLogin';
import WalletLogin from './WalletLogin';
import SignupModal from '../signup/SignupModal';
import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [openSignup, setOpenSignup] = useState(false);

  const handleEmailLogin = async (email: string) => {
    try {
      const response = await fetch('/api/auth/signin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('Login successful');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
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
          signatureMessage: messageString
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Successfully logged in with wallet');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login with wallet');
      throw error;
    }
  };

  const handleSignupClick = () => {
    onClose(); // Close login modal
    setOpenSignup(true); // Open signup modal
  };

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        title="Welcome Back"
      >
        {/* Notice Card */}
        <div className="bg-[#2C393F]/80 border border-[#00BCD4]/30 rounded-lg p-3
          backdrop-blur-sm">
          <p className="text-xs sm:text-sm text-[#00BCD4] leading-relaxed">
            Choose how you want to access your account.
          </p>
        </div>

        {/* Login Options */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-200">Login with Email</h3>
            <EmailLogin onSubmit={handleEmailLogin} />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#00BCD4]/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#37474F] px-2 text-gray-400">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-200">Login with Wallet</h3>
            <WalletLogin onConnect={handleWalletLogin} />
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={handleSignupClick}
            className="text-[#00BCD4] hover:text-[#00BCD4]/80 font-medium 
              transition-colors"
          >
            Sign up now
          </button>
        </div>
      </AuthModal>

      {openSignup && (
        <SignupModal
          isOpen={openSignup}
          onClose={() => setOpenSignup(false)}
        />
      )}
    </>
  );
};

export default LoginModal;