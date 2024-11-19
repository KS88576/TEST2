import { Switch } from "@headlessui/react";
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

// components/auth/UserDropdown/Settings.tsx
interface UserSettings {
    notifications: {
      email: boolean;
      push: boolean;
      transactions: boolean;
    };
    display: {
      theme: 'light' | 'dark' | 'system';
      currency: 'USD' | 'EUR' | 'GBP';
    };
    privacy: {
      showBalance: boolean;
      publicProfile: boolean;
    };
  }
  
  const Settings: React.FC = () => {
    const [settings, setSettings] = useState<UserSettings>({
      notifications: {
        email: true,
        push: true,
        transactions: true,
      },
      display: {
        theme: 'system',
        currency: 'USD',
      },
      privacy: {
        showBalance: true,
        publicProfile: false,
      },
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
  
    const updateSettings = async (newSettings: Partial<UserSettings>) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(newSettings),
        });
  
        if (!response.ok) throw new Error('Failed to update settings');
  
        setSettings(prev => ({ ...prev, ...newSettings }));
        toast.success('Your preferences have been saved');
      } catch (error) {
        toast.error('Failed to update settings');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-medium text-gray-200 mb-3">
            Notifications
          </h3>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 
              bg-[#2C393F] rounded-lg cursor-pointer">
              <span className="text-sm text-gray-300">Email Notifications</span>
              <Switch
                checked={settings.notifications.email}
                onChange={(checked) => updateSettings({
                  notifications: { ...settings.notifications, email: checked }
                })}
                disabled={isLoading}
                className={`${settings.notifications.email ? 'bg-[#00BCD4]' : 'bg-gray-600'}
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/20`}
              >
                <span className="sr-only">Enable email notifications</span>
                <span
                  className={`${settings.notifications.email ? 'translate-x-6' : 'translate-x-1'}
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </label>
            {/* Add similar switches for push and transaction notifications */}
          </div>
        </section>
  
        <section>
          <h3 className="text-sm font-medium text-gray-200 mb-3">
            Display Settings
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-[#2C393F] rounded-lg">
              <label className="text-sm text-gray-300 block mb-2">
                Theme
              </label>
              <select
                value={settings.display.theme}
                onChange={(e) => updateSettings({
                  display: { ...settings.display, theme: e.target.value as 'light' | 'dark' | 'system' }
                })}
                disabled={isLoading}
                className="w-full bg-[#37474F] border border-[#00BCD4]/30 rounded-lg
                  p-2 text-white focus:border-[#00BCD4] transition-colors"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            {/* Add similar input for currency preference */}
          </div>
        </section>
  
        <section>
          <h3 className="text-sm font-medium text-gray-200 mb-3">
            Privacy
          </h3>
          <div className="space-y-2">
            {/* Add privacy toggles similar to notification switches */}
          </div>
        </section>
      </div>
    );
  };

export default Settings;