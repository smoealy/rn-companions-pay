import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { PointsService } from '../services/PointsService';

interface RewardOption { id: string; name: string; cost: number; }

const rewardOptions: RewardOption[] = [
  { id: 'r1', name: 'Umrah Discount', cost: 100 },
  { id: 'r2', name: 'Ihram Kit Voucher', cost: 50 },
  { id: 'r3', name: 'Airport Lounge Access', cost: 80 },
];

const RewardsScreen: React.FC = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => { PointsService.get().then(setPoints); }, []);

  const redeem = async (cost: number) => {
    const ok = await PointsService.redeem(cost);
    if (ok) {
      const p = await PointsService.get();
      setPoints(p);
      alert('Redeemed! We’ll email your voucher (stub).');
    } else {
      alert('Not enough points.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ihram Points</Text>
      <Text style={styles.points}>{points} pts</Text>

      <FlatList
        data={rewardOptions}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.cost}>{item.cost} pts</Text>
            <Button title="Redeem" onPress={() => redeem(item.cost)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
  points:{ fontSize:18, marginBottom:8 },
  card:{ borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:10, marginBottom:10 },
  name:{ fontSize:16, fontWeight:'500' },
  cost:{ marginVertical:6 },
});

export default RewardsScreen;
