"use client"

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface TimeRange {
  label: string;
  value: string;
}

const timeRanges: TimeRange[] = [
  { label: '1W', value: 'week' },
  { label: '1M', value: 'month' },
  { label: '3M', value: 'quarter' },
  { label: '1Y', value: 'year' },
  { label: 'ALL', value: 'all' }
];

const PortfolioChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('month');
  const [chartData] = useState([
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4800 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 }
  ]);

  const currentValue = chartData[chartData.length - 1].value;
  const previousValue = chartData[chartData.length - 2].value;
  const percentageChange = ((currentValue - previousValue) / previousValue) * 100;

  return (
    <div className="bg-[#37474F]/90 rounded-lg p-6 border border-[#00BCD4]/30">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Portfolio Value</h2>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-white mr-3">${currentValue}</span>
            <div className={`flex items-center ${percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {percentageChange >= 0 ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
              <span>{Math.abs(percentageChange).toFixed(2)}%</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedRange === range.value
                  ? 'bg-[#00BCD4]/20 text-[#00BCD4]'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="name" 
              stroke="#718096" 
              strokeWidth={0.5}
              tick={{ fill: '#718096' }}
            />
            <YAxis 
              stroke="#718096" 
              strokeWidth={0.5}
              tick={{ fill: '#718096' }}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#37474F',
                border: '1px solid rgba(0,188,212,0.3)',
                borderRadius: '8px',
                padding: '8px'
              }}
              itemStyle={{ color: '#00BCD4' }}
              labelStyle={{ color: 'white' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#00BCD4"
              strokeWidth={2}
              dot={{ r: 4, fill: '#37474F', stroke: '#00BCD4', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#00BCD4', stroke: '#37474F', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-[#2C393F] rounded-lg">
        <div className="text-center">
          <p className="text-gray-400 text-sm">24h High</p>
          <p className="text-white font-medium mt-1">$6,200</p>
        </div>
        <div className="text-center border-x border-[#00BCD4]/20">
          <p className="text-gray-400 text-sm">24h Low</p>
          <p className="text-white font-medium mt-1">$5,800</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">24h Volume</p>
          <p className="text-white font-medium mt-1">$1.2M</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;