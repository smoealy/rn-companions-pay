// Ensure native modules are initialized even if Snack boots App.tsx directly
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// ✅ Use JS stack (not native stack) to avoid PlatformConstants error on device
import { createStackNavigator } from '@react-navigation/stack';

// Screens (use ./src/... paths)
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
import Web3ConnectScreen from './src/screens/Web3ConnectScreen';
import Web3TokenScreen from './src/screens/Web3TokenScreen';
import Web3TransferScreen from './src/screens/Web3TransferScreen';
import CardLoadScreen from './src/screens/CardLoadScreen';

// Providers & types
import { AppProvider } from './src/contexts/AppContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppStackParamList } from './src/types';

const Stack = createStackNavigator<AppStackParamList>();

const App: React.FC = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerTitle: 'Companions Pay' }}
          >
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
            <Stack.Screen name="Web3Connect" component={Web3ConnectScreen} />
            <Stack.Screen name="Web3Token" component={Web3TokenScreen} />
            <Stack.Screen name="Web3Transfer" component={Web3TransferScreen} />
            <Stack.Screen name="CardLoad" component={CardLoadScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
