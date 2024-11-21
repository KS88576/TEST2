export interface ApeToken {
    id: string;
    name: string;
    symbol: string;
    launchTime: Date;
    volume24h: string;
    transactions24h: number;
    marketCap: string;
    liquidity: string;
    apy: string;
    price: string;
    priceChange24h: number;
    logoUrl?: string;
    decimals?: number;
  }
  
  export interface TokenRowProps {
    token: ApeToken;
    onBuy: (token: ApeToken) => void;
    onSell: (token: ApeToken) => void;
  }
  
  export interface TableHeaderProps {
    onSort: (column: string) => void;
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  }

  export interface Token {
    name: string;
    symbol: string;
    logo?: string;
    decimals?: number;
    price?: string;
  }