// Ensure native modules are initialized even if Snack boots App.tsx directly
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tabs & Onboarding
import Tabs from './src/navigation/Tabs';
import OnboardingStack from './src/navigation/OnboardingStack';

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

// Providers
import { AppProvider } from './src/contexts/AppContext';
import { AuthProvider } from './src/contexts/AuthContext';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const flag = await AsyncStorage.getItem('onboarded');
        setIsOnboarded(flag === '1');
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return <View style={{ flex: 1, backgroundColor: '#fff' }} />;

  return (
    <AppProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerTitle: 'Companions Pay' }}>
            {isOnboarded ? (
              // Main app: Tabs mounted under "Home"
              <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            ) : (
              // Onboarding flow as its own navigator
              <Stack.Screen name="Onboarding" component={OnboardingStack} options={{ headerShown: false }} />
            )}

            {/* Full-screen flows on top of Tabs */}
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
        </NavigationContainer>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;

