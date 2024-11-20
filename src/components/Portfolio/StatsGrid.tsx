"use client"

import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiDollarSign, FiClock, FiAward } from 'react-icons/fi';
import { useToast } from '@/hooks/useToast';

interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
  change?: {
    value: string;
    positive: boolean;
  };
}

interface ProfileStats {
  activeSince: string;
  totalValueLocked: {
    value: string;
    change: number;
  };
  averageApy: {
    value: number;
    change: number;
  };
  rank: {
    value: number;
    change: number;
  };
}

const StatsGrid: React.FC = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error('Failed to fetch stats');
        
        const data: ProfileStats = await response.json();
        
        setStats([
          { 
            label: 'Total Value Locked', 
            value: data.totalValueLocked.value, 
            icon: FiDollarSign,
            change: { 
              value: `${Math.abs(data.totalValueLocked.change)}%`, 
              positive: data.totalValueLocked.change > 0 
            }
          },
          { 
            label: 'Average APY', 
            value: `${data.averageApy.value}%`, 
            icon: FiTrendingUp,
            change: { 
              value: `${Math.abs(data.averageApy.change)}%`, 
              positive: data.averageApy.change > 0 
            }
          },
          { 
            label: 'Active Since', 
            value: data.activeSince, 
            icon: FiClock 
          },
          { 
            label: 'Rank', 
            value: `#${data.rank.value}`, 
            icon: FiAward,
            change: { 
              value: Math.abs(data.rank.change).toString(), 
              positive: data.rank.change > 0 
            }
          }
        ]);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load statistics');
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-[#37474F]/90 rounded-lg p-4 border border-[#00BCD4]/30
            animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#00BCD4]/20 rounded-lg w-9 h-9" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-[#00BCD4]/20 rounded w-2/3" />
                <div className="h-6 bg-[#00BCD4]/20 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

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
                  <span 
                    className={`text-sm ${stat.change.positive ? 'text-green-400' : 'text-red-400'}`}
                    title={`${stat.change.positive ? 'Increased' : 'Decreased'} by ${stat.change.value}`}
                  >
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