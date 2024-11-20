// components/auth/shared/AuthButton.tsx
import React from 'react';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  loadingText?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  icon,
  isLoading,
  variant = 'primary',
  className,
  loadingText = 'Loading...',
  ...props
}) => {
  const baseStyles = "w-full p-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2";
  const variants = {
    primary: `bg-[#00BCD4] text-white hover:bg-[#00BCD4]/80 
      shadow-[0_0_20px_rgba(0,188,212,0.3)] 
      hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]`,
    secondary: `bg-[#2C393F] text-white hover:bg-[#435761] 
      border border-[#00BCD4]/30 hover:border-[#00BCD4]`
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} 
        disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="animate-spin w-5 h-5 border-2 border-white/20 
            border-t-white rounded-full" 
            role="progressbar"
            aria-label="Loading"
          />
          <VisuallyHidden>{loadingText}</VisuallyHidden>
        </>
      ) : (
        <>
          {icon && (
            <span className="opacity-70" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};