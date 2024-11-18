"use client"

import React from 'react';
import { FiFilter, FiBell, FiCheck } from 'react-icons/fi';
import { NotificationType } from './types';

interface NotificationFiltersProps {
  selectedTypes: NotificationType[];
  onTypeSelect: (type: NotificationType) => void;
  showUnread: boolean;
  onToggleUnread: () => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  selectedTypes,
  onTypeSelect,
  showUnread,
  onToggleUnread
}) => {
  const notificationTypes: { type: NotificationType; label: string }[] = [
    { type: 'price', label: 'Price' },
    { type: 'liquidity', label: 'Liquidity' },
    { type: 'volume', label: 'Volume' },
    { type: 'launch', label: 'Launches' },
    { type: 'apy', label: 'APY' },
    { type: 'transaction', label: 'Transactions' }
  ];

  return (
    <div className="bg-[#2C393F] rounded-lg border border-[#00BCD4]/30 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <FiFilter className="w-5 h-5 text-[#00BCD4]" />
        <h3 className="text-white font-medium">Filters</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onToggleUnread}
          className={`px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors ${
            showUnread 
              ? 'bg-[#00BCD4]/20 text-[#00BCD4]' 
              : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
          }`}
        >
          <FiBell className="w-4 h-4" />
          <span>Unread Only</span>
          {showUnread && <FiCheck className="w-4 h-4 ml-1" />}
        </button>

        {notificationTypes.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onTypeSelect(type)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedTypes.includes(type)
                ? 'bg-[#00BCD4]/20 text-[#00BCD4]'
                : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationFilters;