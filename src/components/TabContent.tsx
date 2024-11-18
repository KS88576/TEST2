"use client"

import React from 'react';
import { TabContentProps } from '@/types';
import MintComponent from './Mint/MintComponent';
import BurnComponent from './Burn/BurnComponent';
import LaunchTab from './Launch/LaunchTab';
import ManageComponent from './Manage/ManageComponent';

const TabContent: React.FC<TabContentProps> = ({ activeTab, tokens, onSelectToken }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'launch':
        return <LaunchTab tokens={tokens} onSelectToken={onSelectToken} />;
      case 'mint':
        return <MintComponent />;
      case 'burn':
        return <BurnComponent />;
      case 'manage':
        return <ManageComponent />;
      default:
        return <LaunchTab tokens={tokens} onSelectToken={onSelectToken} />;
    }
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      {renderContent()}
    </div>
  );
};

export default TabContent;