"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Initialize with URL tab parameter or 'launch'
    return searchParams.get('tab') || 'launch';
  });

  // Update active tab when URL changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else if (pathname === '/') {
      // Reset to 'launch' if we're on home page without a tab parameter
      setActiveTab('launch');
    }
  }, [searchParams, pathname]);

//   const handleTabChange = (tabId: string) => {
//     setActiveTab(tabId);
    
//     // Create new URLSearchParams object to handle parameters properly
//     const newSearchParams = new URLSearchParams(searchParams);
//     newSearchParams.set('tab', tabId);

//     // Preserve current route while updating tab parameter
//     if (pathname === '/') {
//       router.push(`/?${newSearchParams.toString()}`, { scroll: false });
//     } else {
//       router.push(`/?${newSearchParams.toString()}`);
//     }
//   };

const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (pathname !== '/') {
      router.push(`/?tab=${tabId}`);
    } else {
      router.push(`/?tab=${tabId}`, { scroll: false });
    }
  };

  const handleLogoClick = () => {
    setActiveTab('launch');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#37474F]">
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onLogoClick={handleLogoClick}
      />
      {children}
    </div>
  );
}