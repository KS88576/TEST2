// components/auth/UserDropdown/index.tsx
import { Fragment } from 'react';
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from '@headlessui/react';
import { FiChevronDown, FiUser, FiLogOut, FiCopy, FiExternalLink } from 'react-icons/fi';
import { useWallet } from '@solana/wallet-adapter-react';
import Balance from './Balance';
import { useToast } from '@/hooks/useToast';

interface UserDropdownProps {
  user: {
    username: string;
    walletAddress: string;
    authType: 'email' | 'wallet';
  };
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user, onLogout }) => {
  const { toast } = useToast();
  const { disconnect } = useWallet();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (user.authType === 'wallet') {
      disconnect();
    }
    onLogout();
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center space-x-2 px-3 py-2 rounded-lg
        bg-[#2C393F] border border-[#00BCD4]/30 hover:border-[#00BCD4] 
        transition-all duration-200">
        <span className="text-white font-medium">{user.username}</span>
        <FiChevronDown className="w-4 h-4 text-gray-400" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-72 rounded-lg
          bg-[#2C393F] border border-[#00BCD4]/30 shadow-lg 
          shadow-[#00BCD4]/5 focus:outline-none">
          <div className="p-4">
            {/* User Info */}
            <div className="mb-4 pb-4 border-b border-[#00BCD4]/20">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-white">{user.username}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Connected with {user.authType === 'email' ? 'Email' : 'Wallet'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#00BCD4]/20 
                  flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-[#00BCD4]" />
                </div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="mb-4 pb-4 border-b border-[#00BCD4]/20">
              <Balance walletAddress={user.walletAddress} />
            </div>

            {/* Wallet Address */}
            <div className="mb-4 pb-4 border-b border-[#00BCD4]/20">
            <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
            <div className="flex items-center justify-between 
                bg-[#37474F] rounded-lg p-2">
                <code className="text-xs text-white">
                {user.walletAddress.slice(0, 8)}...
                {user.walletAddress.slice(-8)}
                </code>
                <div className="flex items-center space-x-2">
                <button
                    onClick={() => {
                    navigator.clipboard.writeText(user.walletAddress);
                    toast.success("Address copied to clipboard");
                    }}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <FiCopy className="w-4 h-4 text-gray-400" />
                </button>
                <a // This was the missing tag
                    href={`https://explorer.solana.com/address/${user.walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <FiExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                </div>
            </div>
            </div>

            {/* Actions */}
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-red-500/10 text-red-400' : 'text-gray-400'
                  } w-full flex items-center px-3 py-2 rounded-lg 
                  transition-colors duration-200`}
                >
                  <FiLogOut className="w-4 h-4 mr-2" />
                  <span>Log Out</span>
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;