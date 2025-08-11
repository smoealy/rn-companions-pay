import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'PKR' | 'SAR' | 'AED' | 'USD';

export interface WalletBalances {
  PKR: number;
  SAR: number;
  AED: number;
  USD: number;
}

export interface HajjGoal {
  name: string;
  targetAmount: number;
  saved: number;
  year: number;
}

interface AppState {
  balances: WalletBalances;
  loyaltyPoints: number;
  hajjGoals: HajjGoal[];
  sendMoney: (amount: number, currency: Currency) => void;
  convertCurrency: (from: Currency, to: Currency, amount: number) => void;
  addHajjGoal: (goal: HajjGoal) => void;
}

const defaultState: AppState = {
  balances: { PKR: 100000, SAR: 0, AED: 0, USD: 0 },
  loyaltyPoints: 0,
  hajjGoals: [],
  sendMoney: () => {},
  convertCurrency: () => {},
  addHajjGoal: () => {},
};

const AppContext = createContext<AppState>(defaultState);

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [balances, setBalances] = useState<WalletBalances>(defaultState.balances);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [hajjGoals, setHajjGoals] = useState<HajjGoal[]>([]);

  const sendMoney = (amount: number, currency: Currency) => {
    // For mock purposes, just deduct from chosen currency
    setBalances(prev => ({ ...prev, [currency]: prev[currency] - amount }));
    // Earn points on sending money
    setLoyaltyPoints(prev => prev + Math.floor(amount / 1000));
  };

  const convertCurrency = (from: Currency, to: Currency, amount: number) => {
    // Simple mock conversion: 1:1 for demonstration
    setBalances(prev => ({
      ...prev,
      [from]: prev[from] - amount,
      [to]: prev[to] + amount,
    }));
  };

  const addHajjGoal = (goal: HajjGoal) => {
    setHajjGoals(prev => [...prev, goal]);
  };

  return (
    <AppContext.Provider
      value={{ balances, loyaltyPoints, hajjGoals, sendMoney, convertCurrency, addHajjGoal }}
    >
      {children}
    </AppContext.Provider>
  );
};
