"use client"

import React from 'react';
import { FiActivity, FiDollarSign, FiDroplet, FiTrendingUp, FiClock, FiRefreshCw } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { TokenNotification } from './types';

interface NotificationCardProps {
  notification: TokenNotification;
  onMarkAsRead: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'price': return <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'liquidity': return <FiDroplet className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'volume': return <FiActivity className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'apy': return <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'launch': return <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />;
      default: return <FiClock className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getImportanceColor = () => {
    switch (notification.importance) {
      case 'high': return 'bg-red-400/20 border-red-400/30 text-red-400';
      case 'medium': return 'bg-yellow-400/20 border-yellow-400/30 text-yellow-400';
      default: return 'bg-[#00BCD4]/20 border-[#00BCD4]/30 text-[#00BCD4]';
    }
  };

  return (
    <div 
      className={`relative p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
        notification.read 
          ? 'bg-[#2C393F]/50 border-[#00BCD4]/20' 
          : `${getImportanceColor()} hover:border-opacity-50`
      }`}
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className={`p-1.5 sm:p-2 rounded-lg ${notification.read ? 'bg-[#00BCD4]/10' : 'bg-current/10'}`}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-1 sm:gap-0">
            <h4 className="font-medium text-sm sm:text-base text-white">{notification.tokenSymbol}</h4>
            <span className="text-xs sm:text-sm text-gray-400">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </span>
          </div>
          
          <p className="text-gray-300 text-sm sm:text-base mt-1">{notification.message}</p>
          
          {notification.data && (
            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
              {notification.data.oldValue && notification.data.newValue && (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-gray-400">{notification.data.oldValue}</span>
                  <span>→</span>
                  <span className="text-white">{notification.data.newValue}</span>
                </div>
              )}
              {notification.data.change && (
                <span className={notification.data.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {notification.data.change >= 0 ? '+' : ''}{notification.data.change}%
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {!notification.read && (
        <button
          onClick={() => onMarkAsRead(notification.id)}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 text-xs sm:text-sm text-white/50 
            hover:text-white transition-colors"
        >
          Mark as read
        </button>
      )}
    </div>
  );
};

export default NotificationCard;