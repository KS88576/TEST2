// lib/services/forexPriceService.ts
import { create } from "zustand";

interface Price {
  price: number;
  change24h: number;
  lastUpdate: Date;
}

interface PriceStore {
  prices: Record<string, Price>;
  isLoading: boolean;
  error: string | null;
  updatePrice: (symbol: string, data: Partial<Price>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePriceStore = create<PriceStore>((set) => ({
  prices: {},
  isLoading: true,
  error: null,
  updatePrice: (symbol, data) => {
    set((state) => ({
      prices: {
        ...state.prices,
        [symbol]: { ...(state.prices[symbol] || {}), ...data } as Price,
      },
    }));
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

class ForexPriceService {
  private updateInterval: NodeJS.Timeout | null = null;
  private previousPrices: Record<string, number> = {};
  private pairs = ['EUR/USD', 'GBP/USD', 'USD/TRY', 'USD/MXN'];
  
  // Method 1: Using ExchangeRate-API (completely free, no API key needed)
  // private async fetchExchangeRateAPI() {
  //   try {
  //     const baseCurrencies = ['EUR', 'GBP', 'TRY', 'MXN'];
  //     const responses = await Promise.all(
  //       baseCurrencies.map(currency => 
  //         fetch(`https://open.er-api.com/v6/latest/${currency}`)
  //       )
  //     );
      
  //     const results = await Promise.all(
  //       responses.map(res => res.json())
  //     );
      
  //     results.forEach((data, index) => {
  //       const baseCurrency = baseCurrencies[index];
  //       const pair = baseCurrency === 'EUR' || baseCurrency === 'GBP' 
  //         ? `${baseCurrency}/USD`
  //         : `USD/${baseCurrency}`;
          
  //       const rate = baseCurrency === 'EUR' || baseCurrency === 'GBP'
  //         ? 1 / data.rates.USD
  //         : data.rates.USD;
          
  //       this.updatePrice(pair, rate);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching from ExchangeRate-API:', error);
  //     usePriceStore.getState().setError('Failed to fetch exchange rates');
  //   }
  // }

  // Method 2: Using Alpha Vantage (requires free API key but has more features)
  private async fetchAlphaVantage() {
    // Get a free API key from: https://www.alphavantage.co/support/#api-key
    const API_KEY = process.env.NEXT_PUBLIC_ALPHA_KEY; // API key
    
    try {
      const responses = await Promise.all(
        this.pairs.map(pair => {
          const [from, to] = pair.split('/');
          return fetch(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${API_KEY}`
          );
        })
      );

      const results = await Promise.all(
        responses.map(res => res.json())
      );

      results.forEach((data, index) => {
        const pair = this.pairs[index];
        const rate = parseFloat(
          data['Realtime Currency Exchange Rate']?.['5. Exchange Rate'] || 0
        );
        
        if (rate) {
          this.updatePrice(pair, rate);
        }
      });
    } catch (error) {
      console.error('Error fetching from Alpha Vantage:', error);
      usePriceStore.getState().setError('Failed to fetch exchange rates');
    }
  }

  private updatePrice(symbol: string, currentPrice: number) {
    const previousPrice = this.previousPrices[symbol] || currentPrice;
    const change24h = previousPrice ? 
      ((currentPrice - previousPrice) / previousPrice) * 100 : 
      0;

    usePriceStore.getState().updatePrice(symbol, {
      price: currentPrice,
      change24h,
      lastUpdate: new Date(),
    });

    this.previousPrices[symbol] = currentPrice;
  }

  async initialize() {
    try {
      usePriceStore.getState().setLoading(true);
      
      // Initial fetch
      // await this.fetchExchangeRateAPI();
      // Or use Alpha Vantage:
      await this.fetchAlphaVantage();
      
      // Set up periodic updates
      this.updateInterval = setInterval(async () => {
        // await this.fetchExchangeRateAPI();
        // Or use Alpha Vantage:
        await this.fetchAlphaVantage();
      }, 60000); // Update every minute

      usePriceStore.getState().setLoading(false);
    } catch (error) {
      console.error('Failed to initialize:', error);
      usePriceStore.getState().setError('Failed to connect to forex feed');
    }
  }

  disconnect() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

export const forexPriceService = new ForexPriceService();