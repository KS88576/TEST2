"use client"

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthRequired } from '@/components/auth/AuthRequired';
import UserHeader from './UserHeader';
import StatsGrid from './StatsGrid';
import PortfolioChart from './PortfolioChart';
import HoldingsSection from './HoldingsSection';
import FavoritesCard from './FavoritesCard';

// Define the FavoriteToken interface here or import it
interface FavoriteToken {
  symbol: string;
  name: string;
  price: string;
  change: number;
  currency: string;
}

const PortfolioComponent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [username, setUsername] = useState<string>("CryptoWhale.rs");
  const [favoriteTokens] = useState<FavoriteToken[]>([
    { 
      symbol: 'EUR+', 
      name: 'Euro Plus', 
      price: '1.08', 
      change: 2.5, 
      currency: '€' 
    },
    { 
      symbol: 'MXN+', 
      name: 'Peso Plus', 
      price: '17.24', 
      change: -1.2, 
      currency: '₱' 
    },
    { 
      symbol: 'JPY+', 
      name: 'Yen Plus', 
      price: '149.32', 
      change: 0.8, 
      currency: '¥' 
    },
    { 
      symbol: 'GBP+', 
      name: 'British Pound Plus', 
      price: '0.79', 
      change: 1.5, 
      currency: '£' 
    }
  ]);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleRemoveFavorite = (symbol: string) => {
    // Implement remove favorite logic here
    console.log('Removing favorite:', symbol);
  };

  if (!isAuthenticated) {
    return (
      <AuthRequired message="Please login to view your portfolio and manage your holdings." />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
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

      {/* User Profile Header */}
      <UserHeader />

      {/* Stats Overview */}
      <StatsGrid />

      {/* Portfolio Chart */}
      <PortfolioChart />

      {/* Holdings */}
      <HoldingsSection />

      {/* Favorites */}
      <FavoritesCard 
        favorites={favoriteTokens}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
};

export default PortfolioComponent;