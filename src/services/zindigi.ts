// Typed stubs for JS Bank (Zindigi) integration — swap implementations later.

export type Currency = 'PKR' | 'SAR' | 'AED' | 'USD';

export interface ZUser {
  customerId: string;
  kycStatus: 'unverified' | 'pending' | 'verified';
}

export interface ZBalance {
  currency: Currency;
  amount: number;
}

export interface ZFxQuote {
  from: Currency;
  to: Currency;
  rate: number;
  expiresAt: string; // ISO8601
}

export interface ZTransferRequest {
  fromCurrency: Currency;
  toCurrency?: Currency; // optional for FX on send
  amount: number;
  recipient: { type: 'mobile' | 'iban' | 'card'; value: string };
  memo?: string;
}

export interface ZCard {
  id: string;
  status: 'active' | 'frozen';
  last4: string;
}

export const Zindigi = {
  // Auth & KYC
  async getCurrentUser(): Promise<ZUser> {
    return { customerId: 'demo-123', kycStatus: 'verified' };
  },

  // Wallet
  async getBalances(): Promise<ZBalance[]> {
    return [
      { currency: 'PKR', amount: 52000 },
      { currency: 'SAR', amount: 0 },
      { currency: 'AED', amount: 0 },
      { currency: 'USD', amount: 0 },
    ];
  },

  // FX
  async getQuote(from: Currency, to: Currency): Promise<ZFxQuote> {
    const map: Record<Currency, Record<Currency, number>> = {
      PKR: { PKR:1, SAR:0.0136, AED:0.0133, USD:0.0036 },
      SAR: { PKR:73.5, SAR:1, AED:0.98, USD:0.27 },
      AED: { PKR:75.2, SAR:1.02, AED:1, USD:0.27 },
      USD: { PKR:278.0, SAR:3.75, AED:3.67, USD:1 },
    };
    return { from, to, rate: map[from][to], expiresAt: new Date(Date.now()+60_000).toISOString() };
  },

  // Transfers
  async send(req: ZTransferRequest): Promise<{ id: string; status: 'processing' | 'completed' }> {
    // replace with real POST to Zindigi
    return { id: `txn_${Date.now()}`, status: 'completed' };
  },

  // Cards
  async getCard(): Promise<ZCard> {
    return { id: 'card_001', status: 'active', last4: '1234' };
  },

  async setCardStatus(status: 'active' | 'frozen'): Promise<ZCard> {
    return { id: 'card_001', status, last4: '1234' };
  },
};
