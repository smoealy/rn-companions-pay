import AsyncStorage from '@react-native-async-storage/async-storage';

export type TxKind = 'topup' | 'send' | 'convert' | 'redeem' | 'card_load' | 'buy';
export type Currency = 'PKR' | 'SAR' | 'AED' | 'USD';

export interface TxItem {
  id: string;
  kind: TxKind;
  amount: number;
  currency: Currency;      // primary amount currency
  meta?: Record<string, any>; // e.g., { toCurrency, recipient, rate }
  at: string;              // ISO date
}

const KEY = 'tx_log_v1';

export const TransactionService = {
  async list(): Promise<TxItem[]> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  },
  async add(tx: Omit<TxItem, 'id' | 'at'>): Promise<TxItem[]> {
    const now = new Date().toISOString();
    const item: TxItem = { id: `tx_${Date.now()}`, at: now, ...tx };
    const list = await TransactionService.list();
    const next = [item, ...list].slice(0, 500); // keep last 500
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return next;
  },
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  }
};
