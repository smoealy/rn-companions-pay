import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../contexts/AppContext';

interface RewardOption {
  id: string;
  name: string;
  cost: number;
}

const rewardOptions: RewardOption[] = [
  { id: 'r1', name: 'Umrah Discount', cost: 100 },
  { id: 'r2', name: 'Ihram Kit Voucher', cost: 50 },
  { id: 'r3', name: 'Airport Lounge Access', cost: 75 },
];

const RewardsScreen: React.FC = () => {
  const { loyaltyPoints } = useApp();

  const handleRedeem = (option: RewardOption) => {
    if (loyaltyPoints >= option.cost) {
      alert(`Redeemed ${option.name}! (Cost: ${option.cost} points)`);
    } else {
      alert('Not enough points');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Loyalty & Rewards</Text>
      <Text style={styles.points}>Ihram Points: {loyaltyPoints}</Text>
      <FlatList
        data={rewardOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rewardItem}>
            <Text>{item.name} - {item.cost} pts</Text>
            <Button title="Redeem" onPress={() => handleRedeem(item)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  points: { fontSize: 16, marginBottom: 20 },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default RewardsScreen;
