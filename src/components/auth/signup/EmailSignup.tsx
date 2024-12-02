// components/auth/signup/EmailSignup.tsx
import WalletInfo from './WalletInfo';
import { useState } from 'react';
import { AuthButton } from '../shared/AuthButton';
import { useToast } from '@/hooks/useToast';
import { DialogContent, Dialog } from '@/components/ui/dialog';
import { FiArrowLeft, FiMail } from 'react-icons/fi';

interface EmailSignupProps {
    onBack: () => void;
    onClose: () => void;
  }


  
  const EmailSignup: React.FC<EmailSignupProps> = ({ onBack, onClose }) => {
    const [step, setStep] = useState<'email' | 'username' | 'wallet' | 'verify'>('email');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
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
      setIsLoading(true);
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
        setShowConfirmation(true);
        
        toast.success("Please check your email to verify your account.");
      } catch (error) {
        toast.error("Failed to create account");
      } finally {
        setIsLoading(false);
      }
    };

    const EmailConfirmationModal = () => (
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-[#1C2B33] border border-[#00BCD4]/30 text-white">
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-[#00BCD4]/10 rounded-full">
                <FiMail className="w-8 h-8 text-[#00BCD4]" />
              </div>
              <h3 className="text-xl font-semibold">Check Your Email</h3>
              <p className="text-gray-300">
                We've sent an email. Please check your email inbox or spam folder and click on the link we sent to verify your email address.
              </p>
              <div className="p-4 bg-[#2C393F] rounded-lg w-full">
                <p className="text-sm text-amber-400">
                  Warning: Be sure it came from stabledotfun@gmail.com
                </p>
              </div>
            </div>
            <AuthButton
              onClick={() => {
                setShowConfirmation(false);
                setStep('wallet');
              }}
              className="w-full"
            >
              Continue to Wallet Setup
            </AuthButton>
          </div>
        </DialogContent>
      </Dialog>
    );
  
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
                disabled={!formData.username || isLoading}
                isLoading={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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
        <EmailConfirmationModal />
      </div>
    );
  };

  export default EmailSignup;