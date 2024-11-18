export interface TimeRange {
    label: string;
    value: string;
  }
  
  export interface Token {
    name: string;
    symbol: string;
    price: string;
    amount?: string;
    value?: string;
    change?: number;
    supply?: string;
    comments?: Comment[];
    type?: 'stablebond' | 'stablecoin';
    apy?: string;
  }
  
  export interface Comment {
    user: string;
    text: string;
    timestamp?: string;
  }
  
  export interface ChartData {
    name: string;
    value: number;
  }
  
  export interface UserStats {
    label: string;
    value: string;
    icon: React.ElementType;
    change?: {
      value: string;
      positive: boolean;
    };
  }