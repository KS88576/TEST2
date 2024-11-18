"use client"

import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { TableHeaderProps } from './types';

const TableHeader: React.FC<TableHeaderProps> = ({ onSort, sortColumn, sortDirection }) => {
  const headers = [
    { key: 'token', label: 'Token' },
    { key: 'volume', label: '24hr Volume' },
    { key: 'price', label: 'Price' },
    { key: 'marketCap', label: 'Mkt Cap' },
    { key: 'liquidity', label: 'Liquidity' },
    { key: 'apy', label: 'APY' },
    { key: 'actions', label: 'Quick Trade' }
  ];

  const SortIcon = ({ column }: { column: string }) => (
    <span className="ml-1 inline-block transition-transform duration-200">
      {sortColumn === column ? (
        sortDirection === 'asc' ? (
          <FiArrowUp className="w-3 h-3" />
        ) : (
          <FiArrowDown className="w-3 h-3" />
        )
      ) : (
        <FiArrowUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
      )}
    </span>
  );

  return (
    <tr className="bg-[#2C393F]">
      {headers.map((header) => (
        <th
          key={header.key}
          onClick={() => header.key !== 'actions' && onSort(header.key)}
          className={`px-6 py-4 text-left text-sm font-medium text-gray-400 
            ${header.key !== 'actions' ? 'cursor-pointer group hover:text-white' : ''} 
            transition-colors`}
        >
          <div className="flex items-center">
            {header.label}
            {header.key !== 'actions' && <SortIcon column={header.key} />}
          </div>
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;