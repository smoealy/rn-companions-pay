import { Zindigi, ZBalance, ZTransferRequest, Currency } from './zindigi';
import { TransactionService } from './TransactionService';

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
    const q = await Zindigi.getQuote(from, to);
    // TODO: call real convert; for now just assume success and refresh
    await TransactionService.add({ kind: 'convert', amount, currency: from, meta: { toCurrency: to, rate: q.rate } });
    return this.getBalances();
  },

  async sendToFamily(currency: Currency, amount: number, recipientMobile: string): Promise<void> {
    const req: ZTransferRequest = {
      fromCurrency: currency,
      amount,
      recipient: { type: 'mobile', value: recipientMobile },
    };
    await Zindigi.send(req);
    await TransactionService.add({ kind: 'send', amount, currency, meta: { recipient: recipientMobile } });
    POINTS += Math.floor(amount / 1000);
  },

  async topUpPKR(amount: number): Promise<void> {
    // In real flow: payment success → credit via Zindigi → refresh
    await TransactionService.add({ kind: 'topup', amount, currency: 'PKR' });
    POINTS += Math.floor(amount / 500);
  },
};
