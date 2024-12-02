import React from 'react';
import { FaCoins, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const sectionDetails = [
  {
    title: "Choose a stablebond",
    description: "Select from a range of stable bonds that match your investment goals and risk tolerance.",
    icon: FaCoins
  },
  {
    title: "Mint your Stablecoin.",
    description: "Generate your stablecoin by leveraging the selected stable bond as collateral.",
    icon: FaMoneyBillWave
  },
  {
    title: "Manage and Earn Yield.",
    description: "Monitor your investment and earn yield through strategic stablecoin management.",
    icon: FaChartLine
  }
];

const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-br from-[#37474F] to-[#263238] text-white py-16">
      <h2 className="text-center text-3xl font-bold mb-12">How It Works</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {sectionDetails.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div
              key={index}
              className="
              border-2
              border-[#00FFFF]

                flex flex-col items-center text-center 
                bg-[#263238] p-6 rounded-lg 
                relative
                before:absolute before:inset-0 before:border-2 before:border-transparent 
                before:bg-gradient-to-r before:from-blue-500 before:to-blue-700 
                before:rounded-lg before:opacity-0 
                hover:before:opacity-100 
                before:transition-opacity 
                before:-z-10
              "
            >
              <IconComponent className="text-5xl text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
              <p className="text-gray-300">{section.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HowItWorks;
