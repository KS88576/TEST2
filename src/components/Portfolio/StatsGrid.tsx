"use client"

import React from 'react';
import { FiTrendingUp, FiDollarSign, FiClock, FiAward } from 'react-icons/fi';

interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
  change?: {
    value: string;
    positive: boolean;
  };
}

const StatsGrid: React.FC = () => {
  const stats: Stat[] = [
    { 
      label: 'Total Value Locked', 
      value: '$123,456', 
      icon: FiDollarSign,
      change: { value: '12.5%', positive: true }
    },
    { 
      label: 'Average APY', 
      value: '12.5%', 
      icon: FiTrendingUp,
      change: { value: '2.3%', positive: true }
    },
    { 
      label: 'Active Since', 
      value: '234 days', 
      icon: FiClock 
    },
    { 
      label: 'Rank', 
      value: '#123', 
      icon: FiAward,
      change: { value: '5', positive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#37474F]/90 rounded-lg p-4 border border-[#00BCD4]/30
          hover:shadow-[0_0_20px_rgba(0,188,212,0.15)] transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#00BCD4]/20 rounded-lg">
              <stat.icon className="w-5 h-5 text-[#00BCD4]" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <div className="flex items-center space-x-2">
                <p className="text-white text-xl font-bold">{stat.value}</p>
                {stat.change && (
                  <span className={`text-sm ${stat.change.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change.positive ? '↑' : '↓'} {stat.change.value}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;