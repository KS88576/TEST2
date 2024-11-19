// components/auth/signup/SignupModal.tsx
import { useState } from 'react';
import { AuthModal } from '../shared/AuthModal';
import EmailSignup from './EmailSignup';
import WalletSignup from './WalletSignup';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState<'initial' | 'email' | 'wallet'>('initial');
  
  return (
    <AuthModal
      isOpen={isOpen}
      onClose={onClose}
      title={activeStep === 'initial' ? 'Create Account' : 
        activeStep === 'email' ? 'Sign Up with Email' : 'Connect Wallet'}
    >
      {activeStep === 'initial' ? (
        <div className="space-y-6">
          <div className="bg-[#2C393F]/80 border border-[#00BCD4]/30 rounded-lg p-3">
            <p className="text-xs sm:text-sm text-[#00BCD4] leading-relaxed">
              Choose how you want to create your account. Both methods are secure and free.
            </p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => setActiveStep('email')}
              className="p-4 bg-[#2C393F] rounded-lg border border-[#00BCD4]/30
                hover:border-[#00BCD4] transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">Sign Up with Email</h3>
                <span className="text-xs bg-[#00BCD4]/20 text-[#00BCD4] px-2 py-1 rounded">
                  Recommended
                </span>
              </div>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Create an account using your email. We'll generate a wallet for you automatically.
              </p>
            </button>

            <button
              onClick={() => setActiveStep('wallet')}
              className="p-4 bg-[#2C393F] rounded-lg border border-[#00BCD4]/30
                hover:border-[#00BCD4] transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">Connect Wallet</h3>
              </div>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Connect your existing Solana wallet to create an account.
              </p>
            </button>
          </div>
        </div>
      ) : activeStep === 'email' ? (
        <EmailSignup onBack={() => setActiveStep('initial')} onClose={onClose} />
      ) : (
        <WalletSignup onBack={() => setActiveStep('initial')} onClose={onClose} />
      )}
    </AuthModal>
  );
};

export default SignupModal;