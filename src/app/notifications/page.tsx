"use client"

import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import Notifications from "@/components/Notifications/Notifications";
import { FiBell, FiSettings } from 'react-icons/fi';

export default function NotificationsPage() {
  return (
    <AppLayout>

    <div className="min-h-screen bg-[#37474F]">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,188,212,0.1) 1px, transparent 1px),
              linear-gradient(rgba(0,188,212,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Notification Settings Bar */}
      <div className="bg-[#2C393F] border-b border-[#00BCD4]/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <FiBell className="w-8 h-8 mr-3 text-[#00BCD4]" />
                Notifications
              </h1>
              <p className="text-gray-400">
                Stay updated with your favorite tokens and market movements
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-[#37474F] text-white rounded-lg border 
                border-[#00BCD4]/30 hover:border-[#00BCD4] transition-colors 
                flex items-center space-x-2"
              >
                <FiSettings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="px-4 py-2 bg-[#00BCD4] text-white rounded-lg 
                hover:bg-[#00BCD4]/80 transition-colors"
              >
                Mark All as Read
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <Notifications />
      </main>
    </div>
    </AppLayout>
  );
}