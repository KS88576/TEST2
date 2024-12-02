"use client";
import React, { Suspense } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import AdminBondsPanel from '@/components/Admin/BondsPanel';
import { Card } from '@/components/ui/card';
import AppLayout from '@/components/layouts/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { FiLock, FiLoader } from 'react-icons/fi';
import Loading from './loading'

const AdminPage = () => {
  const { connected } = useWallet();
  const { isAdmin, isLoading, factoryState, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <AppLayout>
        
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 bg-[#37474F]/30 border border-[#00BCD4]/30">
          <div className="text-center space-y-4">
            <FiLoader className="w-8 h-8 text-[#00BCD4] animate-spin mx-auto" />
            <p className="text-gray-400">Checking permissions...</p>
          </div>
        </Card>
      </div>
      </AppLayout>

    );
  }

  // Check both authentication and admin status
  if (!isAuthenticated || !isAdmin) {
    return (
      <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 bg-[#37474F]/30 border border-[#00BCD4]/30">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <FiLock className="w-12 h-12 text-[#00BCD4]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access Required</h1>
            <p className="text-gray-400">
              {!connected 
                ? "Please connect your wallet to access the admin dashboard."
                : !isAuthenticated
                ? "Please log in to access the admin dashboard."
                : "Your wallet does not have admin privileges."}
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <WalletMultiButton className="bg-[#00BCD4] hover:bg-[#00BCD4]/80 transition-colors" />
            </div>
          </div>
        </Card>
      </div>
      </AppLayout>

    );
  }

  // Show admin dashboard
  return (
    <AppLayout>

    <div className="min-h-screen bg-[#263238]">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Manage your stablecoin protocol settings
            </p>
          </div>
          <WalletMultiButton className="bg-[#00BCD4] hover:bg-[#00BCD4]/80 transition-colors" />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-[#37474F]/30 border border-[#00BCD4]/30">
            <h3 className="text-gray-400 text-sm font-medium">Total Bonds</h3>
            <p className="text-2xl font-bold text-white mt-2">
              {factoryState?.allowedBondConfigs?.length || 0}
            </p>
          </Card>
          <Card className="p-6 bg-[#37474F]/30 border border-[#00BCD4]/30">
            <h3 className="text-gray-400 text-sm font-medium">Base Fee Rate</h3>
            <p className="text-2xl font-bold text-white mt-2">
              {factoryState?.baseFeeRate.toString() || '-'}%
            </p>
          </Card>
          <Card className="p-6 bg-[#37474F]/30 border border-[#00BCD4]/30">
            <h3 className="text-gray-400 text-sm font-medium">Min Collateral Ratio</h3>
            <p className="text-2xl font-bold text-white mt-2">
              {factoryState?.minCollateralRatio.toString() || '-'}%
            </p>
          </Card>
        </div>

        {/* Admin Panels */}
        <div className="grid grid-cols-1 gap-8">
          <Card className="p-6 bg-[#37474F]/30 border border-[#00BCD4]/30">
            <Suspense fallback={<Loading />}>
                <AdminBondsPanel />
            </Suspense>
          </Card>
        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default AdminPage;