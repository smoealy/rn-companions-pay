import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useApp } from '../contexts/AppContext';

interface RedeemOption {
  id: string;
  name: string;
  cost: number;
}

const redeemOptions: RedeemOption[] = [
  { id: 'r1', name: 'Umrah Package Discount', cost: 200 },
  { id: 'r2', name: 'Ihram Kit Voucher', cost: 50 },
  { id: 'r3', name: 'Zamzam Water Pack', cost: 30 },
];

const RedeemScreen: React.FC = () => {
  const { loyaltyPoints } = useApp();

  const handleRedeem = (option: RedeemOption) => {
    if (loyaltyPoints >= option.cost) {
      alert(`Redeemed ${option.name}!`);
    } else {
      alert('Not enough points');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redeem Rewards</Text>
      <Text style={styles.points}>Your Points: {loyaltyPoints}</Text>
      <FlatList
        data={redeemOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.cost} pts</Text>
            <Button title="Redeem" onPress={() => handleRedeem(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  points: { fontSize: 16, marginBottom: 20 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default RedeemScreen;
