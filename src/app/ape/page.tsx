"use client"

import AppLayout from '@/components/layouts/AppLayout';
import ApeOrSell from "@/components/ApeOrSell/ApeOrSell";
import QuickStats from "@/components/ApeOrSell/QuickStats";
import { FiActivity, FiAlertCircle } from 'react-icons/fi';

export default function ApePage() {
    return (
      <AppLayout>
        {/* Live Activity Feed */}
        <div className="bg-[#2C393F] border-b border-[#00BCD4]/30 overflow-hidden">
          <div className="container mx-auto py-2">
            <div className="flex items-center animate-scroll-x whitespace-nowrap">
              <div className="flex items-center text-[#00BCD4] px-4">
                <FiActivity className="w-4 h-4 mr-2" />
                <span>Live Activity</span>
              </div>
              {[
                "SUPER token launched 2s ago",
                "$1.2M USDT traded for NEW+",
                "MEGA token liquidity added",
                "APE+ price up 25%"
              ].map((activity, index) => (
                <span key={index} className="mx-8 text-gray-400">
                  • {activity}
                </span>
              ))}
            </div>
          </div>
        </div>
  
        {/* Risk Warning */}
        <div className="bg-[#2C393F]/50 border-b border-[#00BCD4]/30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-yellow-400 text-sm">
              <FiAlertCircle className="w-4 h-4 mr-2" />
              <span>
                Trading new tokens involves high risk. Always do your own research and trade responsibly.
              </span>
            </div>
          </div>
        </div>
  
        {/* Quick Stats Bar */}
        <QuickStats />
  
        {/* Main Content */}
        <main>
          <ApeOrSell />
        </main>
      </AppLayout>
    );
  }