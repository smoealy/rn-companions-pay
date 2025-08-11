export type Currency = 'PKR' | 'SAR' | 'AED' | 'USD';
export type Balances = Record<Currency, number>;

let BALANCES: Balances = { PKR: 50000, SAR: 0, AED: 0, USD: 0 };
let POINTS = 120; // Ihram Points

export const WalletService = {
  getBalances: async (): Promise<Balances> => { await sleep(150); return { ...BALANCES }; },
  getPoints: async (): Promise<number> => { await sleep(100); return POINTS; },
  addPoints: async (amount: number) => { POINTS += amount; },

  convert: async (from: Currency, to: Currency, amount: number): Promise<Balances> => {
    if (BALANCES[from] < amount) throw new Error('Insufficient funds');
    const rate = FX[from][to];
    BALANCES[from] -= amount;
    BALANCES[to] += amount * rate;
    return { ...BALANCES };
  },

  sendToFamily: async (currency: Currency, amount: number): Promise<void> => {
    if (BALANCES[currency] < amount) throw new Error('Insufficient funds');
    BALANCES[currency] -= amount;
    POINTS += Math.floor(amount / 1000); // earn points on send
  },

  topUpPKR: async (amount: number) => {
    BALANCES.PKR += amount;
    POINTS += Math.floor(amount / 500);
  },
};

const FX: Record<Currency, Record<Currency, number>> = {
  PKR: { PKR: 1, SAR: 0.0136, AED: 0.0133, USD: 0.0036 },
  SAR: { PKR: 73.5, SAR: 1, AED: 0.98, USD: 0.27 },
  AED: { PKR: 75.2, SAR: 1.02, AED: 1, USD: 0.27 },
  USD: { PKR: 278.0, SAR: 3.75, AED: 3.67, USD: 1 },
};

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }
