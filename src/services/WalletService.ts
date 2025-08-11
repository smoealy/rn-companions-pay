// WalletService now delegates to Zindigi stubs so it’s easy to switch to real APIs
import { Zindigi, ZBalance, ZTransferRequest, Currency } from './zindigi';

export type Balances = Record<Currency, number>;

function toMap(list: ZBalance[]): Balances {
  const map: Balances = { PKR: 0, SAR: 0, AED: 0, USD: 0 };
  for (const b of list) map[b.currency] = b.amount;
  return map;
}

let POINTS = 120;

export const WalletService = {
  async getBalances(): Promise<Balances> {
    const list = await Zindigi.getBalances();
    return toMap(list);
  },

  async getPoints(): Promise<number> { return POINTS; },
  async addPoints(n: number) { POINTS += n; },

  async convert(from: Currency, to: Currency, amount: number): Promise<Balances> {
    // (stub) just request a quote and assume success => update via getBalances
    await Zindigi.getQuote(from, to);
    // In real impl: call Zindigi FX-convert endpoint, then fetch balances
    return this.getBalances();
  },

  async sendToFamily(currency: Currency, amount: number, recipientMobile: string): Promise<void> {
    const req: ZTransferRequest = {
      fromCurrency: currency,
      amount,
      recipient: { type: 'mobile', value: recipientMobile },
    };
    await Zindigi.send(req);
    POINTS += Math.floor(amount / 1000);
  },

  async topUpPKR(amount: number): Promise<void> {
    // In real impl: call processor → on success, credit PKR via Zindigi
    // For now, no-op then rely on future getBalances from Zindigi to reflect change
    POINTS += Math.floor(amount / 500);
  },
};

