import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Flags } from '../services/Flags';
import { AppStackParamList } from '../types';

type HomeScreenProps = { navigation: StackNavigationProp<AppStackParamList, 'Home'> };

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [web3, setWeb3] = useState(false);

  useEffect(() => {
    Flags.getWeb3().then(setWeb3);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Companions Pay</Text>
      <Button title="Wallet" onPress={() => navigation.navigate('Wallet')} />
      <Button title="Open Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      <Button title="Send Money" onPress={() => navigation.navigate('SendMoney')} />
      <Button title="Top Up" onPress={() => navigation.navigate('TopUp')} />
      <Button title="Rewards" onPress={() => navigation.navigate('Rewards')} />
      <Button title="Hajj Goals" onPress={() => navigation.navigate('HajjGoals')} />
      <Button title="Card" onPress={() => navigation.navigate('Card')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />

      {web3 && (
        <>
          <Button title="Connect Wallet" onPress={() => navigation.navigate('Web3Connect')} />
          <Button title="Token Balance" onPress={() => navigation.navigate('Web3Token')} />
          <Button title="Send Token" onPress={() => navigation.navigate('Web3Transfer')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
});

export default HomeScreen;
