"use client"

import React, { useState } from 'react';
import { FiDollarSign, FiBell, FiSettings } from 'react-icons/fi';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { SubscribedToken, NotificationPreference } from './types';

interface TokenSubscriptionCardProps {
  token: SubscribedToken;
  onUpdatePreferences: (tokenId: string, preferences: NotificationPreference[]) => void;
  onUnsubscribe: (tokenId: string) => void;
}

const TokenSubscriptionCard: React.FC<TokenSubscriptionCardProps> = ({
  token,
  onUpdatePreferences,
  onUnsubscribe
}) => {
  const [preferences, setPreferences] = useState(token.preferences);

  const handleTogglePreference = (type: string) => {
    const newPreferences = preferences.map(pref => 
      pref.type === type ? { ...pref, enabled: !pref.enabled } : pref
    );
    setPreferences(newPreferences);
    onUpdatePreferences(token.id, newPreferences);
  };

  return (
    <div className="bg-[#2C393F] rounded-lg border border-[#00BCD4]/30 p-4 hover:border-[#00BCD4]/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#00BCD4]/20 flex items-center justify-center">
            {token.logoUrl ? (
              <img src={token.logoUrl} alt={token.name} className="w-6 h-6 rounded-full" />
            ) : (
              <FiDollarSign className="w-5 h-5 text-[#00BCD4]" />
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">{token.symbol}</h3>
            <p className="text-gray-400 text-sm">{token.name}</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <FiSettings className="w-5 h-5 text-gray-400" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#37474F] border-[#00BCD4] text-white">
            <DialogHeader>
              <DialogTitle>Notification Settings - {token.symbol}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              {preferences.map((pref) => (
                <div key={pref.type} className="flex items-center justify-between">
                  <div>
                    <p className="text-white">{pref.type.charAt(0).toUpperCase() + pref.type.slice(1)}</p>
                    <p className="text-sm text-gray-400">
                      Get notified about {pref.type} changes
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePreference(pref.type)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      pref.enabled ? 'bg-[#00BCD4]' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      pref.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => onUnsubscribe(token.id)}
                className="w-full mt-4 p-2 bg-red-500/20 text-red-400 rounded-lg 
                  hover:bg-red-500/30 transition-colors"
              >
                Unsubscribe
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {preferences.map((pref) => (
          <div
            key={pref.type}
            className={`px-3 py-2 rounded-lg text-sm ${
              pref.enabled 
                ? 'bg-[#00BCD4]/20 text-[#00BCD4]' 
                : 'bg-gray-600/20 text-gray-400'
            }`}
          >
            <FiBell className="w-3 h-3 inline-block mr-1" />
            {pref.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenSubscriptionCard;