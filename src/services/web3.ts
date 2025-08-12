// Runtime-only Web3 helper (no TypeScript type exports)

// Chain IDs we may use (ETH, Polygon, Base)
export const CHAINS = { ETH: 1, POLYGON: 137, BASE: 8453 };

// In a typed codebase you might declare:
// type ChainId = 1 | 137 | 8453;
// but some bundlers fail on `export type`, so we treat chainId as a number.

type Wallet = { address: string; chainId: number; connected: boolean };
type TokenInfo = { symbol: string; decimals: number; address?: string };

const STATE: { wallet: Wallet | null; token: TokenInfo } = {
  wallet: null,
  token: { symbol: 'IHRAM', decimals: 18 }
};

export const Web3 = {
  /**
   * Connect to a wallet (stub)
   * @returns {Promise<{ address: string; chainId: number; connected: boolean }>}
   */
  async connect(): Promise<Wallet> {
    const w: Wallet = {
      address: '0xDEMO000000000000000000000000000000000001',
      chainId: CHAINS.POLYGON,
      connected: true
    };
    STATE.wallet = w;
    return w;
  },

  /** Disconnect the current wallet */
  async disconnect() {
    STATE.wallet = null;
  },

  /**
   * Get the current wallet
   * @returns {null | { address: string; chainId: number; connected: boolean }}
   */
  wallet(): Wallet | null { return STATE.wallet; },

  /**
   * Get token metadata
   * @returns {Promise<{ symbol: string; decimals: number; address?: string }>}
   */
  async tokenInfo(): Promise<TokenInfo> { return STATE.token; },

  /**
   * Get token balance (stub)
   * @param {string} [address]
   * @returns {Promise<string>}
   */
  async balanceOf(address?: string): Promise<string> {
    if (!STATE.wallet) return '0';
    // TODO: replace with real on-chain RPC
    return '123.456';
  },

  /**
   * Transfer tokens (stub)
   * @param {string} to
   * @param {string} amount
   * @returns {Promise<{ hash: string }>}
   */
  async transfer(to: string, amount: string): Promise<{ hash: string }> {
    if (!STATE.wallet) throw new Error('Wallet not connected');
    // TODO: sign & send transaction
    return { hash: '0xHASH_DEMO_' + Date.now().toString(16) };
  }
};

