// src/types.ts

// 👇 Tabs (the bottom navigator shown under "Home")
export type TabParamList = {
  Dashboard: undefined;
  Wallet: undefined;
  Goals: undefined;     // if your tab is called "Goals" (HajjGoals screen)
  Impact: undefined;    // if you added the Impact tab
  Rewards: undefined;
  Card: undefined;
  Settings: undefined;
};

// 👇 Root app stack (overlays that sit on top of Tabs)
export type AppStackParamList = {
  Home: undefined; // mounts Tabs

  // Overlays / full-screen flows
  SendMoney: undefined;
  TopUp: undefined;
  BuyTokens: undefined;
  Checkout: { tokens: number; price: number; creditPkr: number };
  TransactionHistory: undefined;
  Web3Token: undefined;
  Web3Transfer: undefined;
  CardLoad: undefined;

  // Do NOT include Web3Connect here anymore (it's in Onboarding)
};

// 👇 Onboarding-only stack (shown before Home)
export type OnboardingStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  ChooseJourney: undefined;
  GoalBasics: undefined;
  InviteFamily: undefined;
  Web3Connect: undefined; // final step (has Continue + Skip)
};
