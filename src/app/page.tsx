"use client"

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TabContent from "@/components/TabContent";
import { Token } from '@/types';
import AppLayout from '@/components/layouts/AppLayout';

export default function Home() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'launch';
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [tokens] = useState<Token[]>([
    { 
      name: "USD Plus", 
      symbol: "USD+", 
      price: "1.00",
      supply: "1,000,000",
      comments: [
        { user: "Alice", text: "Great yields!" },
        { user: "Bob", text: "Very stable performance" }
      ]
    },
    { 
      name: "EUR Plus", 
      symbol: "EUR+", 
      price: "1.08",
      supply: "500,000",
      comments: [
        { user: "Charlie", text: "European markets coverage!" },
        { user: "David", text: "Stable Euro alternative" }
      ]
    },
    { 
      name: "MXN Plus", 
      symbol: "MXN+", 
      price: "0.058",
      supply: "2,000,000",
      comments: [
        { user: "Eva", text: "Great for LATAM!" },
        { user: "Frank", text: "Mexican bond yields" }
      ]
    }
  ]);

  return (
    <AppLayout>
      <div className="relative">
        <div className="absolute inset-0 opacity-5">
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
          <TabContent 
            activeTab={activeTab}
            tokens={tokens} 
            onSelectToken={setSelectedToken} 
          />
        </div>
      </div>
    </AppLayout>
  );
}