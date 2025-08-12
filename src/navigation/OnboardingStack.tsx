import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import SignInScreen from '../screens/onboarding/SignInScreen';
import ChooseJourneyScreen from '../screens/onboarding/ChooseJourneyScreen';
import GoalBasicsScreen from '../screens/onboarding/GoalBasicsScreen';
import InviteFamilyScreen from '../screens/onboarding/InviteFamilyScreen';
import Web3ToggleScreen from '../screens/onboarding/Web3ToggleScreen';
import { OnboardingProvider } from '../contexts/OnboardingContext';

export type OnboardingStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  ChooseJourney: undefined;
  GoalBasics: undefined;
  InviteFamily: undefined;
  Web3Toggle: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingStack: React.FC<{ onFinish: () => void }> = ({ onFinish }) => (
  <OnboardingProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ChooseJourney" component={ChooseJourneyScreen} />
      <Stack.Screen name="GoalBasics" component={GoalBasicsScreen} />
      <Stack.Screen name="InviteFamily" component={InviteFamilyScreen} />
      <Stack.Screen name="Web3Toggle" component={Web3ToggleScreen} />
      </Stack.Screen>
    </Stack.Navigator>
  </OnboardingProvider>
);
