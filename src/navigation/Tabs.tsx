import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import DashboardScreen from '../screens/DashboardScreen';
import WalletScreen from '../screens/WalletScreen';
import HajjGoalsScreen from '../screens/HajjGoalsScreen';
import RewardsScreen from '../screens/RewardsScreen';
import CardScreen from '../screens/CardScreen';
import ImpactScreen from '../screens/ImpactScreen'; // will add next
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0E6B5B',
        tabBarInactiveTintColor: '#8AA39B',
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Dashboard: 'home',
            Wallet: 'wallet',
            Goals: 'flag',
            Impact: 'heart',
            Rewards: 'gift',
            Card: 'card',
            Settings: 'settings',
          };
          const name = icons[route.name] || 'ellipse';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Goals" component={HajjGoalsScreen} />
      <Tab.Screen name="Impact" component={ImpactScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Card" component={CardScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Tabs;
