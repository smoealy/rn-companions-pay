import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { WalletService, Balances } from '../services/WalletService';
import { TransactionService, TxItem } from '../services/TransactionService';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../types';

type Props = { navigation: StackNavigationProp<AppStackParamList, 'Dashboard'> };

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [balances, setBalances] = useState<Balances>({ PKR: 0, SAR: 0, AED: 0, USD: 0 });
  const [points, setPoints] = useState(0);
  const [tx, setTx] = useState<TxItem[]>([]);

  const load = async () => {
    setBalances(await WalletService.getBalances());
    setPoints(await WalletService.getPoints());
    const list = await TransactionService.list();
    setTx(list.slice(0, 5));
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button title="Refresh" onPress={load} />

      <View style={styles.card}>
        <Text style={styles.label}>Ihram Points</Text>
        <Text style={styles.value}>{points}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Balances</Text>
        <Text>PKR: {balances.PKR.toFixed(2)}</Text>
        <Text>SAR: {balances.SAR.toFixed(2)}</Text>
        <Text>AED: {balances.AED.toFixed(2)}</Text>
        <Text>USD: {balances.USD.toFixed(2)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Recent Activity</Text>
        <FlatList
          data={tx}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>{item.kind}</Text>
              <Text>{item.amount} {item.currency}</Text>
            </View>
          )}
        />
        <Button title="View All" onPress={() => navigation.navigate('TransactionHistory')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: '600' },
  card: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 10, gap: 6 },
  label: { fontWeight: '600' },
  value: { fontSize: 20, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#eee' },
});

export default DashboardScreen;

