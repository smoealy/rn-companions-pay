import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import Card from '../components/Card';
import { PointsService } from '../services/PointsService';
import { theme } from '../theme';

type ImpactItem = { id: string; name: string; points: number; blurb: string };
const IMPACT: ImpactItem[] = [
  { id: 'i1', name: 'Gift Zamzam (Family in Makkah)', points: 40, blurb: 'Sponsor Zamzam water for a pilgrim.' },
  { id: 'i2', name: 'Plant a Tree (Madinah)', points: 60, blurb: 'Support greening in Madinah.' },
  { id: 'i3', name: 'Quran Donation', points: 80, blurb: 'Provide a Quran to a traveler.' },
];

const ImpactScreen: React.FC = () => {
  const [points, setPoints] = useState(0);

  const load = async () => setPoints(await PointsService.get());
  useEffect(() => { load(); }, []);

  const redeem = async (item: ImpactItem) => {
    const ok = await PointsService.redeem(item.points);
    if (ok) {
      await load();
      Alert.alert('Thank you!', `Redeemed ${item.points} Ihram Points for "${item.name}".`);
    } else {
      Alert.alert('Not enough points', `You need ${item.points} points for that.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make an Impact</Text>
      <Text style={styles.points}>Ihram Points: {points}</Text>

      <FlatList
        data={IMPACT}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.blurb}>{item.blurb}</Text>
            <Text style={styles.cost}>{item.points} pts</Text>
            <Button title="Redeem" onPress={() => redeem(item)} />
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: theme.colors.bg, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, color: theme.colors.text },
  points: { color: theme.colors.subtext, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  blurb: { color: theme.colors.subtext, marginBottom: 6 },
  cost: { fontWeight: '600', marginBottom: 8 }
});

export default ImpactScreen;
