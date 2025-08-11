import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Companions Pay</Text>
      <Button title="Wallet" onPress={() => navigation.navigate('Wallet')} />
      <Button title="Send Money" onPress={() => navigation.navigate('SendMoney')} />
      <Button title="Card" onPress={() => navigation.navigate('Card')} />
      <Button title="Hajj Goals" onPress={() => navigation.navigate('HajjGoals')} />
      <Button title="Rewards" onPress={() => navigation.navigate('Rewards')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Top Up" onPress={() => navigation.navigate('TopUp')} />
      <Button title="Redeem" onPress={() => navigation.navigate('Redeem')} />
      <Button title="Buy Tokens" onPress={() => navigation.navigate('BuyTokens')} />
      <Button title="Transactions" onPress={() => navigation.navigate('TransactionHistory')} />
      <Button title="Card Load" onPress={() => navigation.navigate('CardLoad')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default HomeScreen;
