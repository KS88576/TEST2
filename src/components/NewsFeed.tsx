"use client"

import React from 'react';

const NewsFeed: React.FC = () => {
  const news: string[] = [
    "New stablecoin USDT+ launched with 5% APY",
    "MXN stablecoin reaches 1M supply",
    "EURX adds new yield farming options",
    "JPY+ stablecoin integration with major exchanges",
    "GBP+ reaches £10M TVL milestone",
    "New staking rewards program launched",
  ];

  return (
    <div className="bg-[#37474F]/50 border-y border-[#00BCD4]/30 py-2 overflow-hidden relative z-0">
      <div className="animate-scroll-x flex whitespace-nowrap relative">
        {[...news, ...news].map((item, i) => (
          <span key={i} className="mx-8 text-[#00BCD4]">• {item}</span>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;