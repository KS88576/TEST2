// components/ui/toast.tsx
import { Toaster as Sonner } from 'sonner';

const Toast = () => {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      toastOptions={{
        style: {
          background: '#2C393F',
          border: '1px solid rgba(0, 188, 212, 0.3)',
          color: 'white',
          fontSize: '14px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 188, 212, 0.15)',
        },
        success: {
          style: {
            background: '#2C393F',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: 'white',
          },
          icon: '✓',
        },
        error: {
          style: {
            background: '#2C393F',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: 'white',
          },
          icon: '✕',
        },
      }}
    />
  );
};

export { Toast };