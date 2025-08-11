import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import WalletScreen from './src/screens/WalletScreen';
import SendMoneyScreen from './src/screens/SendMoneyScreen';
import CardScreen from './src/screens/CardScreen';
import HajjGoalsScreen from './src/screens/HajjGoalsScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TopUpScreen from './src/screens/TopUpScreen';
import RedeemScreen from './src/screens/RedeemScreen';
import BuyTokensScreen from './src/screens/BuyTokensScreen';
import CheckoutWebView from './src/screens/CheckoutWebView';
import TransactionHistoryScreen from './src/screens/TransactionHistoryScreen';
import CardLoadScreen from './src/screens/CardLoadScreen';

import { AppProvider } from './src/contexts/AppContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppStackParamList } from './src/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const App: React.FC = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
            <Stack.Screen name="Card" component={CardScreen} />
            <Stack.Screen name="HajjGoals" component={HajjGoalsScreen} />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="TopUp" component={TopUpScreen} />
            <Stack.Screen name="Redeem" component={RedeemScreen} />
            <Stack.Screen name="BuyTokens" component={BuyTokensScreen} />
            <Stack.Screen name="Checkout" component={CheckoutWebView} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Stack.Screen name="CardLoad" component={CardLoadScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
