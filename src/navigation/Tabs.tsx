import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DashboardScreen from '../screens/DashboardScreen';
import WalletScreen from '../screens/WalletScreen';
import HajjGoalsScreen from '../screens/HajjGoalsScreen';
import RewardsScreen from '../screens/RewardsScreen';
import CardScreen from '../screens/CardScreen';
import ImpactScreen from '../screens/ImpactScreen';
import SettingsScreen from '../screens/SettingsScreen';

import type { TabParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();

const Tabs: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0E6B5B',
        tabBarInactiveTintColor: '#8AA39B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          height: 56 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => {
          const map: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
            Dashboard: 'home',
            Wallet: 'wallet',
            Goals: 'flag',
            Impact: 'heart',
            Rewards: 'gift',
            Card: 'card',
            Settings: 'settings',
          };
          const name = map[route.name as keyof TabParamList] ?? 'ellipse';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
      sceneContainerStyle={{ backgroundColor: '#F7F8FA' }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Goals" component={HajjGoalsScreen} />
      <Tab.Screen name="Impact" component={ImpactScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Card" component={CardScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;

