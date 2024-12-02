"use client"

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TabContent from "@/components/TabContent";
import { Token } from '@/types';
import AppLayout from '@/components/layouts/AppLayout';

interface StablecoinData extends Token {
  apy: string;
  tvl: string;
  volume24h: string;
  holders: number;
  marketCap: string;
  pairedBond: string;
}

const stablecoins: StablecoinData[] = [
  { 
    name: "USD Stablecoin",
    symbol: "USD+",
    price: "1.00",
    supply: "49,225",
    apy: "5%",
    tvl: "$223,062",
    volume24h: "$1,234,567",
    holders: 1234,
    marketCap: "$98,765,432",
    pairedBond: "USTRY",
    comments: [
      { user: "TopTrader", text: "Leading stablecoin with consistent performance" },
      { user: "CryptoAnalyst", text: "Highest TVL in the ecosystem" }
    ]
  },
  { 
    name: "Mexican Peso Stablecoin",
    symbol: "MXN+",
    price: "0.058",
    supply: "17,931,970",
    apy: "9%",
    tvl: "MX$2,726,007",
    volume24h: "MX$15,234,567",
    holders: 856,
    marketCap: "MX$89,765,432",
    pairedBond: "CETES",
    comments: [
      { user: "MexiTrader", text: "Best peso-backed stablecoin available" },
      { user: "LatamAnalyst", text: "Great for Mexican market exposure" }
    ]
  },
  { 
    name: "Brazilian Real Stablecoin",
    symbol: "BRL+",
    price: "0.20",
    supply: "365,855",
    apy: "10%",
    tvl: "R$49,755.80",
    volume24h: "R$5,234,567",
    holders: 623,
    marketCap: "R$45,765,432",
    pairedBond: "TESOURO",
    comments: [
      { user: "BrazilTrader", text: "High yields with Brazilian bonds" },
      { user: "RealAnalyst", text: "Perfect for Real exposure" }
    ]
  },
  { 
    name: "Euro Stablecoin",
    symbol: "EUR+",
    price: "1.08",
    supply: "6,913",
    apy: "2.4%",
    tvl: "€12,325.01",
    volume24h: "€2,234,567",
    holders: 445,
    marketCap: "€15,765,432",
    pairedBond: "EUROB",
    comments: [
      { user: "EuroTrader", text: "Stable Euro alternative" },
      { user: "EUAnalyst", text: "Great for European exposure" }
    ]
  },
  { 
    name: "British Pound Stablecoin",
    symbol: "GBP+",
    price: "1.25",
    supply: "17,380",
    apy: "3%",
    tvl: "£12,285.07",
    volume24h: "£1,834,567",
    holders: 389,
    marketCap: "£22,765,432",
    pairedBond: "GILTS",
    comments: [
      { user: "UKTrader", text: "Best GBP-backed stablecoin" },
      { user: "GBPAnalyst", text: "Solid performance with British bonds" }
    ]
  }
];

export default function Home() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'launch';
  const [selectedToken, setSelectedToken] = useState<StablecoinData | null>(null);

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
            tokens={stablecoins} 
            onSelectToken={(token) => setSelectedToken(token as StablecoinData | null)} 
          />
        </div>
      </div>
    </AppLayout>
  );
}