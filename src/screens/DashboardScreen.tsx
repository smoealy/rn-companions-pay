import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalletService, Balances } from '../services/WalletService';
import { TransactionService, TxItem } from '../services/TransactionService';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabParamList, AppStackParamList } from '../types';
import Card from '../components/Card';
import { theme } from '../theme';

type NavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Dashboard'>,
  StackNavigationProp<AppStackParamList>
>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button title="Refresh" onPress={load} />

      <Card style={{ marginTop: theme.spacing(1) }}>
        <Text style={styles.label}>Ihram Points</Text>
        <Text style={styles.value}>{points}</Text>
      </Card>

      <Card>
        <Text style={styles.label}>Balances</Text>
        <Text>PKR: {balances.PKR.toFixed(2)}</Text>
        <Text>SAR: {balances.SAR.toFixed(2)}</Text>
        <Text>AED: {balances.AED.toFixed(2)}</Text>
        <Text>USD: {balances.USD.toFixed(2)}</Text>
      </Card>

      <Card>
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
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: theme.spacing(1.5) as unknown as number, backgroundColor: theme.colors.bg },
  title: { fontSize: 22, fontWeight: '600', color: theme.colors.text },
  label: { fontWeight: '600', marginBottom: 6, color: theme.colors.text },
  value: { fontSize: 20, fontWeight: '700', color: theme.colors.primary },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
});

export default DashboardScreen;

