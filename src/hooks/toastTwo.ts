// hooks/useToast.ts
import { toast } from 'sonner';
import toastStyles from '@/components/ui/toast';

interface ToastProps {
  title?: string;
  description: string;
  variant?: 'default' | 'success' | 'error';
  duration?: number;
}

export function useToast() {
  const showToast = ({ title, description, variant = 'default', duration = 5000 }: ToastProps) => {
    const commonProps = {
      duration,
      style: toastStyles.default,
    };

    switch (variant) {
      case 'success':
        return toast.success(description, {
          ...commonProps,
          style: { ...toastStyles.default, ...toastStyles.success },
        });
      case 'error':
        return toast.error(description, {
          ...commonProps,
          style: { ...toastStyles.default, ...toastStyles.error },
        });
      default:
        return toast(description, commonProps);
    }
  };

  return { toast: showToast };
}