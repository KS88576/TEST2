
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
    token: StablecoinData | null;
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
    tokens: (Token | StablecoinData)[];
    onSelectToken: (token: Token | StablecoinData | null) => void;
  }
  

  export interface StablecoinData extends Token {
    apy: string;  // Make these required instead of optional
    tvl: string;
    volume24h: string;
    holders: number;
    marketCap: string;
    pairedBond: string;
    currency: string;
  }

  export interface TokenManageCardProps {
    token: StablecoinData;
    onTokenUpdate: (updatedToken: StablecoinData) => void;
  }

  export interface EditTokenModalProps {
    token: StablecoinData;
    onSave: (updatedToken: StablecoinData) => void;
    onClose: () => void;
  }
