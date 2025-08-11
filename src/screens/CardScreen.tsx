import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  currency: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', description: 'Grocery Store', amount: -5000, currency: 'PKR' },
  { id: '2', description: 'Pharmacy', amount: -2300, currency: 'PKR' },
  { id: '3', description: 'Top-up from wallet', amount: 10000, currency: 'PKR' },
];

const CardScreen: React.FC = () => {
  const [frozen, setFrozen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debit Card</Text>
      <View style={styles.cardBox}>
        <Text style={styles.cardNumber}>1234 5678 9012 3456</Text>
        <Text style={styles.cardInfo}>Expiry: 12/27</Text>
        <Text style={styles.cardInfo}>CVV: ***</Text>
      </View>
      <Button title={frozen ? 'Unfreeze Card' : 'Freeze Card'} onPress={() => setFrozen(!frozen)} />
      <Text style={styles.subtitle}>Recent Transactions</Text>
      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.description}</Text>
            <Text>{item.amount} {item.currency}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  cardBox: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
  },
  cardNumber: { fontSize: 24, letterSpacing: 2, marginBottom: 5 },
  cardInfo: { fontSize: 16 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default CardScreen;
