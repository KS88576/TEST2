// contexts/AuthContext.tsx
"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, BN, Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { IDL } from '@/idl';
import { PROGRAM_ID } from '@/constants';
import LoginModal from '@/components/auth/login/LoginModal';

interface StablebondConfig {
  bondMint: PublicKey;
  paymentMint: PublicKey;
  minCreationAmount: BN;
  minRedemptionAmount: BN;
  isEnabled: boolean;
  customFeeRate: number | null;
}

interface BondCollateralInfo {
  bondMint: PublicKey;
  totalCollateral: BN;
  numStablecoins: number;
}

interface FactoryState {
  admin: PublicKey;
  feeVault: PublicKey;
  isPaused: boolean;
  minCollateralRatio: number;
  baseFeeRate: number;
  stablecoinCount: number;
  lastUpdate: BN;
  allowedBondConfigs: StablebondConfig[];
  bondCollateralTracking: BondCollateralInfo[];
  authorizedCollectors: PublicKey[];
  protocolVersion: number;
  bump: number;
  reserved: number[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  factoryState: FactoryState | null;
  requireAuth: (action: () => void) => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  factoryState: null,
  requireAuth: () => {},
  login: () => {},
  logout: () => {},
});

function isFactoryState(state: any): state is FactoryState {
  return (
    state &&
    'admin' in state &&
    'feeVault' in state &&
    'isPaused' in state &&
    'minCollateralRatio' in state
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if we're on the client side and if there's a token
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  });

    // Wallet-based admin state
    const { connection } = useConnection();
    const wallet = useWallet();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [factoryState, setFactoryState] = useState<FactoryState | null>(null);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Check admin status when wallet changes
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!wallet.publicKey) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const provider = new AnchorProvider(
          connection,
          wallet as any,
          { commitment: 'confirmed' }
        );

        const program = new Program(
          IDL,
          PROGRAM_ID,
          provider
        );

        const [factoryStateAddress] = PublicKey.findProgramAddressSync(
          [Buffer.from("factory_state")],
          program.programId
        );

        const factoryStateAccount = await program.account.factoryState.fetch(
          factoryStateAddress
        );
        
        if (!isFactoryState(factoryStateAccount)) {
          throw new Error('Invalid factory state data');
        }
        setFactoryState(factoryStateAccount);

        setIsAdmin(factoryStateAccount.admin.toString() === wallet.publicKey.toString());
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [wallet.publicKey, connection]);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    // Execute the pending action if it exists
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setIsAuthenticated(false);
  }, []);

  const requireAuth = useCallback((action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setPendingAction(() => action);
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
    value={{ 
      isAuthenticated, 
      isAdmin,
      isLoading,
      factoryState,
      requireAuth, 
      login, 
      logout 
    }}
    >
      {children}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => {
          setShowLoginModal(false);
          setPendingAction(null);
        }} 
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}