"use client"
import React from 'react';
import { FaCoins, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const sectionDetails = [
  {
    title: "Choose a Stablebond",
    description: "Select from a range of stable bonds that match your investment goals and risk tolerance.",
    icon: FaCoins
  },
  {
    title: "Mint Your Stablecoin",
    description: "Generate your stablecoin by leveraging the selected stable bond as collateral.",
    icon: FaMoneyBillWave
  },
  {
    title: "Manage and Earn Yield",
    description: "Monitor your investment and earn yield through strategic stablecoin management.",
    icon: FaChartLine
  }
];

const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-br from-[#37474F] to-[#263238] text-white py-20">
      <h2 className="text-center text-4xl font-bold mb-12 animate-fadeIn">How Stable.fun Works</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-4 animate-fadeInUp">
        {sectionDetails.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div
              key={index}
              className="
                border-2 border-[#00BCD4]
                flex flex-col items-center text-center 
                bg-[#263238] p-8 rounded-lg 
                relative
                before:absolute before:inset-0 before:border-2 before:border-transparent 
                before:bg-gradient-to-r before:from-[#00BCD4] before:to-[#00E5FF] 
                before:rounded-lg before:opacity-0 
                hover:before:opacity-100 
                before:transition-opacity 
                before:-z-10
              "
            >
              <IconComponent className="text-6xl text-[#00BCD4] mb-4 animate-pulse" />
              <h3 className="text-2xl font-semibold mb-3 animate-fadeIn">{section.title}</h3>
              <p className="text-gray-300 animate-fadeIn">{section.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HowItWorks;