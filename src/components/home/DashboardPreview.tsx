import React from 'react';
import { 
  BiCoin, 
  BiImageAlt,
  BiDollar 
} from 'react-icons/bi';
import { 
  BsGearFill,
  BsGraphUp
} from 'react-icons/bs';

const StablecoinDashboard = () => {
  return (
    <div className="w-full bg-[#0B1120] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-sky-400">Stablecoin Creation Dashboard</h2>
        </div>

        {/* Main Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Bond Selection Preview */}
            <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <BiCoin className="text-sky-400 text-2xl" />
                <h3 className="text-xl text-sky-100">Bond Selection</h3>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <img 
                  src="/api/placeholder/800/400" 
                  alt="Bond selection interface" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stablecoin Configuration */}
            <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <BsGearFill className="text-sky-400 text-2xl" />
                <h3 className="text-xl text-sky-100">Configuration</h3>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <img 
                  src="/api/placeholder/800/400" 
                  alt="Stablecoin configuration interface" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Branding & Yield */}
          <div className="space-y-6">
            {/* Custom Branding */}
            <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <BiImageAlt className="text-sky-400 text-2xl" />
                <h3 className="text-xl text-sky-100">Custom Branding</h3>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <img 
                  src="/api/placeholder/800/400" 
                  alt="Branding customization interface" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Yield Calculator */}
            <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <BsGraphUp className="text-sky-400 text-2xl" />
                <h3 className="text-xl text-sky-100">Projected Yield</h3>
              </div>
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <img 
                  src="/api/placeholder/800/400" 
                  alt="Yield calculator interface" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50 hover:bg-slate-800/70 transition-colors">
            <div className="flex items-center gap-2 text-sky-400 mb-2">
              <BiDollar size={20} />
              <span className="text-sm">Average Yield</span>
            </div>
            <p className="text-2xl text-sky-100">4.5% APY</p>
          </div>
          <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50 hover:bg-slate-800/70 transition-colors">
            <div className="flex items-center gap-2 text-sky-400 mb-2">
              <BiCoin size={20} />
              <span className="text-sm">Active Stablecoins</span>
            </div>
            <p className="text-2xl text-sky-100">1,234</p>
          </div>
          <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50 hover:bg-slate-800/70 transition-colors">
            <div className="flex items-center gap-2 text-sky-400 mb-2">
              <BsGraphUp size={20} />
              <span className="text-sm">Total Value Locked</span>
            </div>
            <p className="text-2xl text-sky-100">$45.6M</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StablecoinDashboard;
