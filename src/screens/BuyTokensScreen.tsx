import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

interface TokenPackage {
  id: string;
  tokens: number;
  price: number;
}

const packages: TokenPackage[] = [
  { id: 'p1', tokens: 100, price: 10 },
  { id: 'p2', tokens: 500, price: 45 },
  { id: 'p3', tokens: 1000, price: 80 },
];

const BuyTokensScreen: React.FC = () => {
  const handlePurchase = (pkg: TokenPackage) => {
    alert(`Purchasing ${pkg.tokens} tokens for $${pkg.price}. Payment integration pending.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Ihram Tokens</Text>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.tokens} tokens - ${item.price}</Text>
            <Button title="Buy" onPress={() => handlePurchase(item)} />
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
});

export default BuyTokensScreen;
