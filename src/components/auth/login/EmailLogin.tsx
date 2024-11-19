// components/auth/login/EmailLogin.tsx
import { useState } from 'react';
import { FiMail, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { AuthButton } from '../shared/AuthButton';
import { useToast } from '@/hooks/useToast';

interface EmailLoginProps {
  onSubmit: (email: string) => Promise<void>;
}

const EmailLogin: React.FC<EmailLoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      await onSubmit(email);
      toast.success('Login successful');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      toast.error('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="Enter your email"
            className={`w-full pl-10 pr-4 py-3 bg-[#2C393F] border rounded-lg 
              focus:outline-none transition-colors duration-200
              ${error 
                ? 'border-red-400 focus:border-red-500' 
                : 'border-[#00BCD4]/30 focus:border-[#00BCD4]'
              }
            `}
            disabled={isLoading}
          />
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <FiAlertCircle className="w-5 h-5 text-red-400" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-400 mt-1">{error}</p>
        )}
      </div>

      <AuthButton
        type="submit"
        disabled={!email || isLoading}
        isLoading={isLoading}
        icon={<FiMail className="w-4 h-4" />}
      >
        {isLoading ? 'Logging in...' : 'Continue with Email'}
      </AuthButton>
    </form>
  );
};

export default EmailLogin;