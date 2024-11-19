// hooks/useToast.ts
import { toast } from 'sonner';

export const useToast = () => {
  return {
    toast: {
      success: (message: string) =>
        toast.success(message, {
          className: 'bg-[#2C393F] border-green-500/30',
        }),
      error: (message: string) =>
        toast.error(message, {
          className: 'bg-[#2C393F] border-red-500/30',
        }),
      info: (message: string) =>
        toast(message, {
          className: 'bg-[#2C393F] border-[#00BCD4]/30',
        }),
    },
  };
};