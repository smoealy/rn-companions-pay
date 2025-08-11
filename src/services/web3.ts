export type ChainId = 1 | 137 | 8453; // ETH, Polygon, Base (example)
export interface Web3Wallet { address: string; chainId: ChainId; connected: boolean; }
export interface TokenInfo { symbol: string; decimals: number; address?: string; }

const STATE: { wallet: Web3Wallet | null; token: TokenInfo } = {
  wallet: null,
  token: { symbol: 'IHRAM', decimals: 18 } // your on-chain token symbol
};

export const Web3 = {
  async connect(): Promise<Web3Wallet> {
    // TODO: integrate WalletConnect or native SDK
    // Stub: fake a wallet for UI flows
    const w = { address: '0xDEMO000000000000000000000000000000000001', chainId: 137 as ChainId, connected: true };
    STATE.wallet = w;
    return w;
  },
  async disconnect(): Promise<void> { STATE.wallet = null; },
  wallet(): Web3Wallet | null { return STATE.wallet; },

  async tokenInfo(): Promise<TokenInfo> { return STATE.token; },

  async balanceOf(address?: string): Promise<string> {
    if (!STATE.wallet) return '0';
    // TODO: call on-chain RPC; returning demo balance
    return '123.456'; // string to avoid BigInt/polyfill issues
  },

  async transfer(to: string, amount: string): Promise<{ hash: string }> {
    if (!STATE.wallet) throw new Error('Wallet not connected');
    // TODO: sign & send tx; return demo hash
    return { hash: '0xHASH_DEMO_'.concat(Date.now().toString(16)) };
  }
};
