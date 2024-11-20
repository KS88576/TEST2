// components/ui/toast.tsx
import { Toaster as Sonner } from 'sonner';

const toastStyles = {
  default: {
    background: '#2C393F',
    border: '1px solid rgba(0, 188, 212, 0.3)',
    color: 'white',
    fontSize: '14px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 188, 212, 0.15)',
  },
  success: {
    background: '#2C393F',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    color: 'white',
  },
  error: {
    background: '#2C393F',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: 'white',
  },
};

const Toast = () => {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      toastOptions={{
        style: toastStyles.default,
        className: 'custom-toast',
        classNames: {
          toast: 'group', // Base toast class
          title: 'text-white font-semibold',
          description: 'text-gray-200',
          actionButton: 'bg-[#00BCD4]',
          cancelButton: 'bg-transparent',
          error: 'border-red-500/30 bg-[#2C393F]',
          success: 'border-green-500/30 bg-[#2C393F]',
          info: 'border-[#00BCD4]/30 bg-[#2C393F]',
        },
        duration: 5000,
      }}
    />
  );
};

export { Toast };

export default toastStyles;