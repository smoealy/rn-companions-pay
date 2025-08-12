// Ensure native modules are initialized even if Snack boots App.tsx directly
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
// Allow disabling native screens during development to troubleshoot crashes
const useNativeScreens = process.env.EXPO_PUBLIC_USE_NATIVE_SCREENS !== 'false';
enableScreens(useNativeScreens);

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import Web3TokenScreen from './src/screens/Web3TokenScreen';
import Web3TransferScreen from './src/screens/Web3TransferScreen';
import CardLoadScreen from './src/screens/CardLoadScreen';

// Providers & types
import { AppProvider } from './src/contexts/AppContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { AppStackParamList } from './src/types';

// ✅ Default export (no props)
import OnboardingStack from './src/navigation/OnboardingStack';

const Stack = createStackNavigator<AppStackParamList>();

const AppStackNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitle: 'Companions Pay' }}>
    <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
    <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
    <Stack.Screen name="TopUp" component={TopUpScreen} />
    <Stack.Screen name="BuyTokens" component={BuyTokensScreen} />
    <Stack.Screen name="Checkout" component={CheckoutWebView} />
    <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
    {/* Web3 screens that are part of the main app (token view/transfer) */}
    <Stack.Screen name="Web3Token" component={Web3TokenScreen} />
    <Stack.Screen name="Web3Transfer" component={Web3TransferScreen} />
    <Stack.Screen name="CardLoad" component={CardLoadScreen} />
  </Stack.Navigator>
);

const RootNavigator: React.FC = () => {
  const { loading } = useAuth(); // user is optional now (stubbed if Firebase off)
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Prefer explicit flag; fall back to legacy profile check
        const flag = await AsyncStorage.getItem('onboarded');
        if (flag === '1') return setOnboarded(true);
        const legacyProfile = await AsyncStorage.getItem('userProfile');
        setOnboarded(!!legacyProfile);
      } catch {
        setOnboarded(false);
      }
    })();
  }, []);

  if (loading || onboarded === null) {
    // simple splash to avoid a flash
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  }

  // Not onboarded yet → show onboarding flow (Welcome → … → Web3Connect)
  if (!onboarded) {
    return <OnboardingStack />;
  }

  // Onboarded → main app
  return <AppStackNavigator />;
};

const App: React.FC = () => (
  <SafeAreaProvider>
    <AppProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </AppProvider>
  </SafeAreaProvider>
);

export default App;
