"use client"
import React from 'react';

interface TopPerformersHeaderProps {
  count: number;
}

const TopPerformersHeader: React.FC<TopPerformersHeaderProps> = ({ count }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Top Performers</h2>
      <div className="bg-[#2C393F] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[#00BCD4]/30">
        <span className="text-[#00BCD4] text-sm sm:text-base">{count}</span>
        <span className="text-gray-400 text-sm sm:text-base ml-2">tokens listed</span>
      </div>
    </div>
  );
};

export default TopPerformersHeader;