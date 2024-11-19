"use client"

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiSettings, FiChevronDown, FiActivity, FiWind, FiBell, FiDollarSign, FiBriefcase, FiMinimize, FiAward, FiAnchor, FiStar, FiArrowUpRight, FiTwitter, FiYoutube, FiMessageCircle, FiBookOpen, FiHome } from "react-icons/fi";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from '@/components/auth/LoginModal';
import { HeaderProps } from '@/types';
import Link from 'next/link';

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onLogoClick }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const tabs = [
    { id: 'launch', label: 'Launch', icon: <FiActivity className="w-4 h-4" /> },
    { id: 'mint', label: 'Mint', icon: <FiDollarSign className="w-4 h-4" /> },
    { id: 'burn', label: 'Burn', icon: <FiWind className="w-4 h-4" /> },
    { id: 'manage', label: 'Manage', icon: <FiArrowUpRight className="w-4 h-4" /> },
  ];
  const dropdownItems = [
    { label: 'Home', icon: <FiHome className="w-4 h-4" />, href: '/home' },
    { label: 'Portfolio', icon: <FiBriefcase className="w-4 h-4" />, href: '/portfolio' },
    { label: 'Anchor Ranks', icon: <FiAnchor className="w-4 h-4" />, href: '/ranks' },
    { label: 'Ape', icon: <FiMinimize className="w-4 h-4" />, href: '/ape' },
    { label: 'Notifications', icon: <FiBell className="w-4 h-4" />, href: '/notifications' },
    { label: 'Buy Stablebond', icon: <FiDollarSign className="w-4 h-4" />, href: 'https://app.etherfuse.com' },
  ];

  return (
    <>
    <header className="relative bg-[#37474F] border-b-2 border-[#00BCD4] px-4 sm:px-6 py-4">
      {/* Cyber grid background effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(0,188,212,0.1)_1px,transparent_1px),linear-gradient(rgba(0,188,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>
      <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
        {/* Logo and Dropdown Section */}
        <div className="flex items-center space-x-2">
        <button
            onClick={onLogoClick}
            className="font-mono text-2xl font-bold text-white tracking-wider focus:outline-none"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BCD4] to-white">
              Stable.fun
            </span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              <FiChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#37474F] border border-[#00BCD4]">
              {dropdownItems.map((item) => (
                <DropdownMenuItem key={item.label} className="text-white hover:bg-[#00BCD4]/20">
                  <Link href={item.href} className="flex items-center space-x-2 px-4 py-2 w-full">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <div className="border-t border-[#00BCD4]/30 mt-2 pt-2 px-4 pb-2">
                <div className="flex items-center justify-around">
                  <Link href="https://twitter.com" 
                    className="p-2 hover:bg-white/10 rounded-lg transition-all group">
                    <FiTwitter className="w-5 h-5 text-gray-400 group-hover:text-[#1DA1F2]" />
                  </Link>
                  <Link href="https://discord.com" 
                    className="p-2 hover:bg-white/10 rounded-lg transition-all group">
                    <FiMessageCircle className="w-5 h-5 text-gray-400 group-hover:text-[#5865F2]" />
                  </Link>
                  <Link href="https://youtube.com" 
                    className="p-2 hover:bg-white/10 rounded-lg transition-all group">
                    <FiYoutube className="w-5 h-5 text-gray-400 group-hover:text-[#FF0000]" />
                  </Link>
                  <Link href="/blog" 
                    className="p-2 hover:bg-white/10 rounded-lg transition-all group">
                    <FiBookOpen className="w-5 h-5 text-gray-400 group-hover:text-[#00BCD4]" />
                  </Link>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300
                ${isHomePage && activeTab === tab.id 
                  ? 'bg-[#00BCD4]/20 text-[#00BCD4] shadow-[0_0_10px_rgba(0,188,212,0.3)]' 
                  : 'text-white hover:bg-white/10'}
              `}
            >
              {tab.icon}
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <FiSettings className="w-5 h-5" />
          </button>
          <button 
          onClick={() => setShowLoginModal(true)}
          className="px-3 sm:px-4 py-2 bg-[#00BCD4] text-white text-sm sm:text-base rounded-lg 
            hover:bg-[#00BCD4]/80 transition-colors shadow-[0_0_20px_rgba(0,188,212,0.3)] 
            hover:shadow-[0_0_30px_rgba(0,188,212,0.5)]"
        >
          Login
        </button>
        </div>
      </div>
    </header>
      <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
    </>
  );
};

export default Header;