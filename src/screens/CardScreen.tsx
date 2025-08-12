import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zindigi, ZCard } from '../services/zindigi';

interface Txn { id: string; description: string; amount: number; currency: string; }

const mockTransactions: Txn[] = [
  { id: '1', description: 'Grocery Store', amount: -5000, currency: 'PKR' },
  { id: '2', description: 'Pharmacy', amount: -2300, currency: 'PKR' },
  { id: '3', description: 'Mobile Top-up', amount: -1000, currency: 'PKR' },
];

const CardScreen: React.FC = () => {
  const [card, setCard] = useState<ZCard | null>(null);

  useEffect(() => { Zindigi.getCard().then(setCard); }, []);

  const toggle = async () => {
    if (!card) return;
    const next = await Zindigi.setCardStatus(card.status === 'active' ? 'frozen' : 'active');
    setCard(next);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Companions × Zindigi Card</Text>
      {card && (
        <View style={styles.cardBox}>
          <Text>•••• •••• •••• {card.last4}</Text>
          <Text>Status: {card.status}</Text>
          <Button title={card.status === 'active' ? 'Freeze Card' : 'Unfreeze Card'} onPress={toggle} />
        </View>
      )}

      <Text style={{ marginTop: 12, fontWeight:'600' }}>Recent Transactions</Text>
      <FlatList
        data={mockTransactions}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.txn}>
            <Text>{item.description}</Text>
            <Text>{item.amount} {item.currency}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
  cardBox:{ borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:10, gap:6 },
  txn:{ flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#eee', paddingVertical:8 },
});

export default CardScreen;
