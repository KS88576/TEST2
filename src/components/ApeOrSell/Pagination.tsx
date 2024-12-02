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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-[#2C393F]">
      <span className="text-gray-400 text-sm sm:text-base">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </span>
      <div className="flex w-full sm:w-auto justify-between sm:justify-end gap-2 sm:space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-[#37474F] border border-[#00BCD4]/30 rounded-lg text-white 
            hover:border-[#00BCD4] transition-colors flex items-center justify-center space-x-1 sm:space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <FiArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-[#37474F] border border-[#00BCD4]/30 rounded-lg text-white 
            hover:border-[#00BCD4] transition-colors flex items-center justify-center space-x-1 sm:space-x-2
            disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <span className="hidden sm:inline">Next</span>
          <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;