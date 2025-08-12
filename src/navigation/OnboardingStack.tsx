import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import type { OnboardingStackParamList } from '../types';

import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import ChooseJourneyScreen from '../screens/onboarding/ChooseJourneyScreen';
import GoalBasicsScreen from '../screens/onboarding/GoalBasicsScreen';
import InviteFamilyScreen from '../screens/onboarding/InviteFamilyScreen';
import Web3ConnectScreen from '../screens/Web3ConnectScreen'; // final step
import { OnboardingProvider } from '../contexts/OnboardingContext';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingStack: React.FC = () => (
  <OnboardingProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      {/* Uncomment when ready to use sign-in */}
      {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
      <Stack.Screen name="ChooseJourney" component={ChooseJourneyScreen} />
      <Stack.Screen name="GoalBasics" component={GoalBasicsScreen} />
      <Stack.Screen name="InviteFamily" component={InviteFamilyScreen} />
      <Stack.Screen name="Web3Connect" component={Web3ConnectScreen} />
    </Stack.Navigator>
  </OnboardingProvider>
);

export default OnboardingStack;
