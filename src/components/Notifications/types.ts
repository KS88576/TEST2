export type NotificationType = 'price' | 'liquidity' | 'volume' | 'launch' | 'apy' | 'transaction';

export interface NotificationPreference {
  type: NotificationType;
  enabled: boolean;
  threshold?: number;
}

export interface TokenNotification {
  id: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  importance: 'high' | 'medium' | 'low';
  data?: {
    oldValue?: string | number;
    newValue?: string | number;
    threshold?: number;
    change?: number;
  };
}

export interface SubscribedToken {
  id: string;
  name: string;
  symbol: string;
  logoUrl?: string;
  preferences: NotificationPreference[];
  lastNotification?: Date;
}