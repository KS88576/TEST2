"use client"

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthRequired } from '@/components/auth/AuthRequired';
import { FiBell, FiSettings, FiFilter } from 'react-icons/fi';
import NotificationCard from './NotificationCard';
import TokenSubscriptionCard from './TokenSubscriptionCard';
import NotificationFilters from './NotificationFilters';
import { TokenNotification, NotificationType, SubscribedToken, NotificationPreference } from './types';

const Notifications: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [selectedTypes, setSelectedTypes] = useState<NotificationType[]>([]);
  const [showUnread, setShowUnread] = useState(false);
  const [notifications, setNotifications] = useState<TokenNotification[]>([
    {
      id: '1',
      tokenId: '1',
      tokenName: 'USD Plus',
      tokenSymbol: 'USD+',
      message: 'Price increased above threshold',
      type: 'price',
      timestamp: new Date(),
      read: false,
      importance: 'high',
      data: {
        oldValue: '$1.00',
        newValue: '$1.05',
        change: 5
      }
    },
    // Add more mock notifications
  ]);
  const [subscribedTokens, setSubscribedTokens] = useState<SubscribedToken[]>([
    {
      id: '1',
      name: 'USD Plus',
      symbol: 'USD+',
      preferences: [
        { type: 'price', enabled: true, threshold: 5 },
        { type: 'liquidity', enabled: true },
        { type: 'volume', enabled: false },
        { type: 'apy', enabled: true }
      ],
      lastNotification: new Date()
    },
    // Add more mock subscribed tokens
  ]);

  const handleTypeSelect = (type: NotificationType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleUpdatePreferences = (tokenId: string, preferences: NotificationPreference[]) => {
    setSubscribedTokens(prev =>
      prev.map(token =>
        token.id === tokenId ? { ...token, preferences } : token
      )
    );
  };

  const handleUnsubscribe = (tokenId: string) => {
    setSubscribedTokens(prev => prev.filter(token => token.id !== tokenId));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (showUnread && notification.read) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(notification.type)) return false;
    return true;
  });

  if (!isAuthenticated) {
    return (
      <AuthRequired message="Please login to view your notifications and manage your subscriptions." />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#2C393F] rounded-lg p-6 border border-[#00BCD4]/30">
          <div className="flex items-center justify-between">
            <h3 className="text-white">Unread</h3>
            <FiBell className="w-5 h-5 text-[#00BCD4]" />
          </div>
          <p className="text-2xl font-bold text-[#00BCD4] mt-2">
            {notifications.filter(n => !n.read).length}
          </p>
        </div>
        <div className="bg-[#2C393F] rounded-lg p-6 border border-[#00BCD4]/30">
          <div className="flex items-center justify-between">
            <h3 className="text-white">Subscriptions</h3>
            <FiSettings className="w-5 h-5 text-[#00BCD4]" />
          </div>
          <p className="text-2xl font-bold text-[#00BCD4] mt-2">
            {subscribedTokens.length}
          </p>
        </div>
        <div className="bg-[#2C393F] rounded-lg p-6 border border-[#00BCD4]/30">
          <div className="flex items-center justify-between">
            <h3 className="text-white">Today's Alerts</h3>
            <FiFilter className="w-5 h-5 text-[#00BCD4]" />
          </div>
          <p className="text-2xl font-bold text-[#00BCD4] mt-2">
            {notifications.filter(n => 
              new Date().toDateString() === n.timestamp.toDateString()
            ).length}
          </p>
        </div>
      </div>

      {/* Notification Filters */}
      <NotificationFilters
        selectedTypes={selectedTypes}
        onTypeSelect={handleTypeSelect}
        showUnread={showUnread}
        onToggleUnread={() => setShowUnread(prev => !prev)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notifications Section */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Recent Notifications</h2>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-[#2C393F] rounded-lg border border-[#00BCD4]/30">
              <FiBell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">No notifications found</p>
            </div>
          )}
        </div>

        {/* Subscriptions Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Subscriptions</h2>
          {subscribedTokens.map(token => (
            <TokenSubscriptionCard
              key={token.id}
              token={token}
              onUpdatePreferences={handleUpdatePreferences}
              onUnsubscribe={handleUnsubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;