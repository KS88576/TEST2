export interface Token {
  name: string;
  symbol: string;
  price: string;
  supply: string;
  comments: Comment[];
  type?: 'stablebond' | 'stablecoin';
  tvl?: string;
  apy?: string;
  launchDate?: string;
  marketCap?: string;
  change?: number;
}
  
  export interface Comment {
    user: string;
    text: string;
  }
  
  export interface TokenCardProps {
    token: Token;
    onSelect: (token: Token) => void;
  }
  
  export interface LaunchModalProps {
    isOpen?: boolean;
    onClose?: () => void;
  }
  
  export interface TokenDetailsModalProps {
    token: Token | null;
    isOpen?: boolean;
    onClose?: () => void;
  }
  
  export interface HeaderProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onLogoClick: () => void;
  }
  
  export interface TabContentProps {
    activeTab: string;
    tokens: Token[];
    onSelectToken: (token: Token) => void;
  }