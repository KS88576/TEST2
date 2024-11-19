// components/auth/signup/EmailSignup.tsx
import WalletInfo from './WalletInfo';
import { useState } from 'react';
import { AuthButton } from '../shared/AuthButton';
import { useToast } from '@/hooks/useToast';
import { FiArrowLeft } from 'react-icons/fi';

interface EmailSignupProps {
    onBack: () => void;
    onClose: () => void;
  }
  
  const EmailSignup: React.FC<EmailSignupProps> = ({ onBack, onClose }) => {
    const [step, setStep] = useState<'email' | 'username' | 'wallet' | 'verify'>('email');
    const [formData, setFormData] = useState({
      email: '',
      username: '',
    });
    const [walletInfo, setWalletInfo] = useState<{
      address: string;
      privateKey: string;
    } | null>(null);
    const { toast } = useToast();
  
    const handleEmailSubmit = async (email: string) => {
      setFormData(prev => ({ ...prev, email }));
      setStep('username');
    };
  
    const handleUsernameSubmit = async (username: string) => {
      try {
        const response = await fetch('/api/auth/signup/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, username })
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }
  
        const data = await response.json();
        setWalletInfo({
          address: data.wallet.address,
          privateKey: data.wallet.privateKey
        });
        setStep('wallet');
        
        toast.success("Please check your email to verify your account.");
      } catch (error) {
        toast.error("Failed to create account");
      }
    };
  
    const renderStep = () => {
      switch (step) {
        case 'email':
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="w-full p-3 bg-[#2C393F] border border-[#00BCD4]/30
                    rounded-lg focus:border-[#00BCD4] text-white"
                />
              </div>
              <AuthButton
                onClick={() => handleEmailSubmit(formData.email)}
                disabled={!formData.email}
              >
                Continue
              </AuthButton>
            </div>
          );
  
        case 'username':
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Choose Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                  className="w-full p-3 bg-[#2C393F] border border-[#00BCD4]/30
                    rounded-lg focus:border-[#00BCD4] text-white"
                />
              </div>
              <AuthButton
                onClick={() => handleUsernameSubmit(formData.username)}
                disabled={!formData.username}
              >
                Create Account
              </AuthButton>
            </div>
          );
  
        case 'wallet':
          return <WalletInfo walletInfo={walletInfo!} onClose={onClose} />;
  
        default:
          return null;
      }
    };
  
    return (
      <div className="space-y-6">
        {step !== 'wallet' && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-sm text-gray-400
              hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}
        {renderStep()}
      </div>
    );
  };

  export default EmailSignup;