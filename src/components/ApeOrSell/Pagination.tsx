"use client"

import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#2C393F]">
      <span className="text-gray-400">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </span>
      <div className="flex space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#37474F] border border-[#00BCD4]/30 rounded-lg text-white 
            hover:border-[#00BCD4] transition-colors flex items-center space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-[#37474F] border border-[#00BCD4]/30 rounded-lg text-white 
            hover:border-[#00BCD4] transition-colors flex items-center space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <FiArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;