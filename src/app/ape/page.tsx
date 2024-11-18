"use client"

import AppLayout from '@/components/layouts/AppLayout';
import ApeOrSell from "@/components/ApeOrSell/ApeOrSell";
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
        <div className="bg-[#2C393F]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm">
              <div className="flex items-center space-x-8">
                <div>
                  <span className="text-gray-400">BTC/USD:</span>
                  <span className="text-green-400 ml-2">$50,234.21 (+2.4%)</span>
                </div>
                <div>
                  <span className="text-gray-400">ETH/USD:</span>
                  <span className="text-green-400 ml-2">$2,891.15 (+3.1%)</span>
                </div>
                <div>
                  <span className="text-gray-400">SOL/USD:</span>
                  <span className="text-green-400 ml-2">$98.45 (+5.2%)</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-gray-400">Gas:</span>
                  <span className="text-white ml-2">25 Gwei</span>
                </div>
                <div>
                  <span className="text-gray-400">24h Volume:</span>
                  <span className="text-[#00BCD4] ml-2">$24.5M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <main>
          <ApeOrSell />
        </main>
      </AppLayout>
    );
  }