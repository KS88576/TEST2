// components/auth/UserDropdown/TransactionHistory.tsx
import { useConnection } from '@solana/wallet-adapter-react';
import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';
import { useState, useEffect } from 'react';
import { FiArrowUpRight, FiRefreshCw, FiArrowDownLeft } from 'react-icons/fi';

interface Transaction {
    signature: string;
    type: 'send' | 'receive' | 'swap';
    amount: number;
    token: 'SOL' | 'USDC';
    timestamp: Date;
    status: 'confirmed' | 'pending' | 'failed';
    otherParty: string;
  }
  
  const TransactionHistory: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
    const { connection } = useConnection();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
  
        const publicKey = new PublicKey(walletAddress);
        const signatures = await connection.getSignaturesForAddress(
          publicKey,
          { limit: 10 }
        );
  
        const parsedTransactions = await Promise.all(
          signatures.map(async (sig) => {
            const tx = await connection.getParsedTransaction(sig.signature);
            return parseTransaction(tx, publicKey);
          })
        );
  
        setTransactions(parsedTransactions.filter((tx): tx is Transaction => tx !== null));
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transaction history');
      } finally {
        setIsLoading(false);
      }
    };
  
    const parseTransaction = (
      tx: ParsedTransactionWithMeta | null,
      userPubkey: PublicKey
    ): Transaction | null => {
      if (!tx?.meta || !tx.transaction) return null;
  
      // Add your transaction parsing logic here
      // This is a simplified example
      return {
        signature: tx.transaction.signatures[0],
        type: 'send', // Determine based on transaction data
        amount: 0, // Calculate from transaction data
        token: 'SOL', // Determine from mint address
        timestamp: new Date(tx.blockTime! * 1000),
        status: tx.meta.err ? 'failed' : 'confirmed',
        otherParty: 'Unknown' // Extract from transaction data
      };
    };
  
    useEffect(() => {
      fetchTransactions();
      const interval = setInterval(fetchTransactions, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }, [walletAddress]);
  
    return (
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400">Recent Transactions</h3>
          <button
            onClick={fetchTransactions}
            disabled={isLoading}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FiRefreshCw className={`w-4 h-4 text-gray-400 
              ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
  
        {error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-24" />
                  <div className="h-3 bg-white/10 rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-4">
            No transactions found
          </p>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.signature}
                className="flex items-center p-2 rounded-lg
                  hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 
                  flex items-center justify-center mr-3">
                  {tx.type === 'send' ? (
                    <FiArrowUpRight className="w-4 h-4 text-red-400" />
                  ) : (
                    <FiArrowDownLeft className="w-4 h-4 text-green-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      {tx.type === 'send' ? 'Sent' : 'Received'} {tx.token}
                    </span>
                    <span className={`text-sm font-medium 
                      ${tx.type === 'send' ? 'text-red-400' : 'text-green-400'}`}>
                      {tx.type === 'send' ? '-' : '+'}{tx.amount}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full
                      ${tx.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default TransactionHistory;