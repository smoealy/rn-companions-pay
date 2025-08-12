import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import SignInScreen from '../screens/onboarding/SignInScreen';
import ChooseJourneyScreen from '../screens/onboarding/ChooseJourneyScreen';
import GoalBasicsScreen from '../screens/onboarding/GoalBasicsScreen';
import InviteFamilyScreen from '../screens/onboarding/InviteFamilyScreen';
import Web3ConnectScreen from '../screens/Web3ConnectScreen'; // <- final step
import { OnboardingProvider } from '../contexts/OnboardingContext';

export type OnboardingStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  ChooseJourney: undefined;
  GoalBasics: undefined;
  InviteFamily: undefined;
  Web3Connect: undefined; // <- align route name with screen
};

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingStack: React.FC = () => (
  <OnboardingProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ChooseJourney" component={ChooseJourneyScreen} />
      <Stack.Screen name="GoalBasics" component={GoalBasicsScreen} />
      <Stack.Screen name="InviteFamily" component={InviteFamilyScreen} />
      <Stack.Screen name="Web3Connect" component={Web3ConnectScreen} />
    </Stack.Navigator>
  </OnboardingProvider>
);

export default OnboardingStack;
