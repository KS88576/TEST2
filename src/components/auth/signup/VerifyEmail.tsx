// components/auth/signup/VerifyEmail.tsx
import { useState, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { AuthButton } from "../shared/AuthButton";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';


interface VerifyEmailProps {
    token: string;
    email: string;
  }
  
  const VerifyEmail: React.FC<VerifyEmailProps> = ({ token, email }) => {
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [error, setError] = useState('');
    const { toast } = useToast();
    const router = useRouter();
  
    useEffect(() => {
      const verifyEmail = async () => {
        try {
          const response = await fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, email })
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.error);
          }
  
          setStatus('success');
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
  
          toast.success('Email Verified! Your account has been successfully activated');
  
          // Redirect after delay
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } catch (error) {
          setStatus('error');
          setError(error instanceof Error ? error.message : 'Verification failed');
          toast.error('Failed to verify email');
        }
      };
  
      verifyEmail();
    }, [token, email]);
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#37474F]">
        <div className="max-w-md w-full p-6 space-y-6">
          <div className="bg-[#2C393F] rounded-lg border border-[#00BCD4]/30 p-6
            shadow-[0_0_50px_rgba(0,188,212,0.15)]">
            {status === 'verifying' && (
              <div className="text-center space-y-4">
                <div className="animate-spin w-12 h-12 border-4 border-[#00BCD4]/20
                  border-t-[#00BCD4] rounded-full mx-auto" />
                <h2 className="text-xl font-medium text-white">
                  Verifying your email...
                </h2>
                <p className="text-gray-400">
                  Please wait while we verify your email address
                </p>
              </div>
            )}
  
            {status === 'success' && (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-[#00BCD4]/20 rounded-full mx-auto
                  flex items-center justify-center">
                  <FiCheck className="w-6 h-6 text-[#00BCD4]" />
                </div>
                <h2 className="text-xl font-medium text-white">
                  Email Verified!
                </h2>
                <p className="text-gray-400">
                  Your account has been successfully activated
                </p>
              </div>
            )}
  
            {status === 'error' && (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full mx-auto
                  flex items-center justify-center">
                  <FiX className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-xl font-medium text-white">
                  Verification Failed
                </h2>
                <p className="text-red-400">
                  {error}
                </p>
                <AuthButton onClick={() => router.push('/')}>
                  Go Back Home
                </AuthButton>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };