import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../types';

type Props = { navigation: StackNavigationProp<AppStackParamList, 'Home'> };

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    // Replace so Home isn't in back stack
    navigation.replace('Dashboard');
  }, [navigation]);

  // Empty placeholder while redirecting
  return <SafeAreaView />;
};

export default HomeScreen;
