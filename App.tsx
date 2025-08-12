// Ensure native modules are initialized even if Snack boots App.tsx directly
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tabs
import Tabs from './src/navigation/Tabs';

// Overlay/flow screens (push on top of tabs)
import SendMoneyScreen from './src/screens/SendMoneyScreen';
import TopUpScreen from './src/screens/TopUpScreen';
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
import { OnboardingStack } from './src/navigation/OnboardingStack';
import { useAuth } from './src/contexts/AuthContext';

const Stack = createStackNavigator<AppStackParamList>();

const AppStackNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitle: 'Companions Pay' }}>
    <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
    <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
    <Stack.Screen name="TopUp" component={TopUpScreen} />
    <Stack.Screen name="BuyTokens" component={BuyTokensScreen} />
    <Stack.Screen name="Checkout" component={CheckoutWebView} />
    <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
    <Stack.Screen name="Web3Connect" component={Web3ConnectScreen} />
    <Stack.Screen name="Web3Token" component={Web3TokenScreen} />
    <Stack.Screen name="Web3Transfer" component={Web3TransferScreen} />
    <Stack.Screen name="CardLoad" component={CardLoadScreen} />
  </Stack.Navigator>
);

const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const profile = await AsyncStorage.getItem('userProfile');
      setOnboarded(!!profile);
    };
    check();
  }, [user]);

  if (loading || onboarded === null) return null;

  if (!user || !onboarded) {
    return <OnboardingStack onFinish={() => setOnboarded(true)} />;
  }

  return <AppStackNavigator />;
};

const App: React.FC = () => (
  <AppProvider>
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  </AppProvider>
);

export default App;

