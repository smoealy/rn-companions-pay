import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WalletService } from '../services/WalletService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';

type Props = { navigation: NativeStackNavigationProp<AppStackParamList, 'Home'> };

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => { WalletService.getPoints().then(setPoints); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.points}>Ihram Points: {points}</Text>

      <View style={styles.row}>
        <Button title="Wallet" onPress={() => navigation.navigate('Wallet')} />
        <Button title="Send" onPress={() => navigation.navigate('SendMoney')} />
      </View>
      <View style={styles.row}>
        <Button title="Buy" onPress={() => navigation.navigate('BuyTokens')} />
        <Button title="Rewards" onPress={() => navigation.navigate('Rewards')} />
      </View>
      <View style={styles.row}>
        <Button title="Goals" onPress={() => navigation.navigate('HajjGoals')} />
        <Button title="Card" onPress={() => navigation.navigate('Card')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
  points:{ fontSize:18, marginVertical:6 },
  row:{ flexDirection:'row', gap:10, marginVertical:6, justifyContent:'space-between' },
});

export default DashboardScreen;
