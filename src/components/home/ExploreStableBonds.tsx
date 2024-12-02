import React from 'react';
import {
  BiBuildingHouse,
  BiGlobe
} from 'react-icons/bi';
import {
  BsClockHistory,
  BsPercent
} from 'react-icons/bs';

const ExploreBonds = () => {
  const stablebonds = [
    {
      issuer: "United States Treasury",
      yield: 4.5,
      maturity: "10 years",
      currency: "USD",
      description: "U.S. government-backed treasury bonds with quarterly interest payments"
    },
    {
      issuer: "German Bundesbank",
      yield: 3.2,
      maturity: "5 years",
      currency: "EUR",
      description: "German federal government bonds with strong credit rating"
    },
    {
      issuer: "Japanese Ministry of Finance",
      yield: 2.1,
      maturity: "7 years",
      currency: "JPY",
      description: "Japanese government bonds with semi-annual payments"
    },
    {
      issuer: "UK Treasury",
      yield: 4.2,
      maturity: "15 years",
      currency: "GBP",
      description: "British government gilts with bi-annual interest payments"
    }
  ];

  return (
    <div className="w-full md:px-9 mx-auto p-6 bg-slate-900 min-h-screen">
      <h2 className="text-3xl font-semibold text-sky-400 mb-6 text-center">Explore Stablebonds</h2>

      <div className="grid gap-4">
        {stablebonds.map((bond, index) => (
          <div
            key={index}
            className="rounded-lg bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:bg-slate-800/50 transition-colors p-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <BiBuildingHouse size={24} className="text-sky-400" />
                <div>
                  <h3 className="text-lg font-medium text-sky-100">{bond.issuer}</h3>
                  <p className="text-slate-400">{bond.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
                  <BsPercent size={20} className="text-violet-400" />
                  <div>
                    <p className="text-sm text-slate-400">Yield</p>
                    <p className="text-sky-100">{bond.yield}% APY</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
                  <BsClockHistory size={20} className="text-violet-400" />
                  <div>
                    <p className="text-sm text-slate-400">Maturity</p>
                    <p className="text-sky-100">{bond.maturity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
                  <BiGlobe size={20} className="text-violet-400" />
                  <div>
                    <p className="text-sm text-slate-400">Currency</p>
                    <p className="text-sky-100">{bond.currency}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreBonds;
