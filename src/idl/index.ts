import { SolanaStablecoin } from './types/solana_stablecoin';
import idl from './solana_stablecoin.json';
import { Idl } from '@coral-xyz/anchor';

export type SolanaStablecoinProgram = SolanaStablecoin;
export const IDL = idl as unknown as Idl;