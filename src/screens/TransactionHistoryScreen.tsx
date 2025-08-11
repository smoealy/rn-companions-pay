import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
}

const mockHistory: Transaction[] = [
  { id: 't1', description: 'Top Up', amount: 10000, currency: 'PKR', date: '2025-07-01' },
  { id: 't2', description: 'Send to family', amount: -5000, currency: 'PKR', date: '2025-07-05' },
  { id: 't3', description: 'Umrah Redeem', amount: -2000, currency: 'PKR', date: '2025-07-10' },
];

const TransactionHistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={mockHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text>{item.description}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={{ color: item.amount >= 0 ? 'green' : 'red' }}>
              {item.amount >= 0 ? '+' : ''}{item.amount} {item.currency}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  date: { fontSize: 12, color: '#777' },
});

export default TransactionHistoryScreen;
