// components/auth/shared/AuthModal.tsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FiX } from 'react-icons/fi';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#37474F]/95 border-[#00BCD4] text-white w-[90vw] 
        max-w-[95vw] sm:max-w-[400px] rounded-xl backdrop-blur-xl overflow-hidden 
        shadow-[0_0_50px_rgba(0,188,212,0.15)] animate-in fade-in-0 zoom-in-95">
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BCD4]/10 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 
            bg-gradient-to-r from-transparent via-[#00BCD4]/50 to-transparent" />
          
          {/* Header */}
          <div className="relative pt-4 sm:pt-5 px-4 sm:px-5 text-center">
            <h2 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-white to-[#00BCD4]">
              {title}
            </h2>
            {showCloseButton && (
              <button 
                onClick={onClose}
                className="absolute right-3 top-3 p-1.5 hover:bg-[#2C393F] rounded-full 
                  transition-colors group"
              >
                <FiX className="w-4 h-4 text-gray-400 group-hover:text-[#00BCD4] 
                  transition-colors" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="relative p-4 sm:p-5 space-y-6">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};