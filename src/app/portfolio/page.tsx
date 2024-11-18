"use client"

import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import PortfolioComponent from "@/components/Portfolio/PortfolioComponent";

export default function PortfolioPage() {
  return (
    <AppLayout>
    <div className="min-h-screen bg-[#37474F]">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,188,212,0.1) 1px, transparent 1px),
              linear-gradient(rgba(0,188,212,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      <PortfolioComponent />
    </div>
    </AppLayout>
  );
}