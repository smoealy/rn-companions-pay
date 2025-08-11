import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WalletScreen from './src/screens/WalletScreen';
import SendMoneyScreen from './src/screens/SendMoneyScreen';
import CardScreen from './src/screens/CardScreen';
import HajjGoalsScreen from './src/screens/HajjGoalsScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { AppProvider } from './src/contexts/AppContext';
import { AppStackParamList } from './src/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="Wallet" component={WalletScreen} options={{ title: 'Wallet' }} />
          <Stack.Screen name="SendMoney" component={SendMoneyScreen} options={{ title: 'Send Money' }} />
          <Stack.Screen name="Card" component={CardScreen} options={{ title: 'Card' }} />
          <Stack.Screen name="HajjGoals" component={HajjGoalsScreen} options={{ title: 'Hajj Goals' }} />
          <Stack.Screen name="Rewards" component={RewardsScreen} options={{ title: 'Rewards' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
