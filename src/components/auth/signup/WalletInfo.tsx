import { AuthButton } from "../shared/AuthButton";
import { FiCopy } from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/hooks/useToast';

// components/auth/signup/WalletInfo.tsx
interface WalletInfoProps {
    walletInfo: {
      address: string;
      privateKey: string;
    };
    onClose: () => void;
  }
  
  const WalletInfo: React.FC<WalletInfoProps> = ({ walletInfo, onClose }) => {
    const { toast } = useToast();

    return (
      <div className="space-y-6">
        <div className="bg-[#2C393F]/80 border border-[#00BCD4]/30 rounded-lg p-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-white mb-2">
              Your Wallet is Ready!
            </h3>
            <p className="text-sm text-gray-400">
              Save these details securely. You'll need them to access your account.
            </p>
          </div>
  
          <div className="flex justify-center mb-4">
            <QRCodeSVG
                value={walletInfo.address}
                size={160}
                level="H"
                bgColor="transparent"
                fgColor="#00BCD4"
                className="rounded-lg p-2 bg-[#2C393F]"
                />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Wallet Address
              </label>
              <div className="relative">
                <input
                  readOnly
                  value={walletInfo.address}
                  className="w-full p-3 bg-[#2C393F] border border-[#00BCD4]/30
                    rounded-lg text-white font-mono text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(walletInfo.address);
                    toast.success( "Wallet address copied to clipboard");
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiCopy className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Private Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  readOnly
                  value={walletInfo.privateKey}
                  className="w-full p-3 bg-[#2C393F] border border-[#00BCD4]/30
                    rounded-lg text-white font-mono text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(walletInfo.privateKey);
                    toast.success("Private key copied to clipboard");
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiCopy className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <p className="text-xs text-red-400">
                Never share your private key with anyone!
              </p>
            </div>
          </div>
        </div>
  
        <div className="space-y-4">
          <AuthButton onClick={onClose}>
            I've Saved My Wallet Info
          </AuthButton>
          <p className="text-center text-sm text-gray-400">
            Please check your email to verify your account
          </p>
        </div>
      </div>
    );
  };

  export default WalletInfo;