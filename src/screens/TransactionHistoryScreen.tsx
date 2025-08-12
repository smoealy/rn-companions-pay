import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransactionService, TxItem } from '../services/TransactionService';

const label: Record<TxItem['kind'], string> = {
  topup: 'Top Up',
  send: 'Send to Family',
  convert: 'FX Convert',
  redeem: 'Redeem',
  card_load: 'Card Load',
  buy: 'Buy Credits',
};

const TransactionHistoryScreen: React.FC = () => {
  const [items, setItems] = useState<TxItem[]>([]);

  const load = async () => setItems(await TransactionService.list());
  useEffect(() => { load(); }, []);

  const clear = async () => {
    await TransactionService.clear();
    await load();
  };

  const render = ({ item }: { item: TxItem }) => {
    const subtitle = (() => {
      if (item.kind === 'convert') {
        return `→ ${item.meta?.toCurrency} @ ${item.meta?.rate}`;
      }
      if (item.kind === 'send') {
        return `→ ${item.meta?.recipient}`;
      }
      return '';
    })();

    return (
      <View style={styles.row}>
        <View>
          <Text style={styles.kind}>{label[item.kind]}</Text>
          <Text style={styles.meta}>{subtitle}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.amount}>{item.amount.toLocaleString()} {item.currency}</Text>
          <Text style={styles.date}>{new Date(item.at).toLocaleString()}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <Button title="Refresh" onPress={load} />
      <FlatList
        style={{ marginTop: 8 }}
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={render}
      />
      <Button title="Clear (dev)" onPress={clear} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:22, fontWeight:'600', marginBottom:6 },
  row:{ flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#eee', paddingVertical:10 },
  kind:{ fontSize:16, fontWeight:'600' },
  meta:{ color:'#666' },
  amount:{ fontWeight:'600' },
  date:{ color:'#888', fontSize:12 },
});

export default TransactionHistoryScreen;
