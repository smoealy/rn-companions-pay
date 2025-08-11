import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import { HajjService, HajjGoal } from '../services/HajjService';

const HajjGoalsScreen: React.FC = () => {
  const [goals, setGoals] = useState<HajjGoal[]>([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  useEffect(() => { HajjService.list().then(setGoals); }, []);

  const add = async () => {
    if (!name || !year || !targetAmount) return alert('Fill all fields');
    const next = await HajjService.create({ name, year: Number(year), targetAmount: Number(targetAmount) });
    setGoals(next); setName(''); setYear(''); setTargetAmount('');
  };

  const save = async (id: string) => {
    const next = await HajjService.save(id, 1000); // stub autosave/quick save
    setGoals(next);
  };

  const remove = async (id: string) => {
    const next = await HajjService.remove(id);
    setGoals(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hajj Savings Goals</Text>

      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Name (e.g., Hajj 2028)" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Year" keyboardType="numeric" value={year} onChangeText={setYear} />
      </View>
      <TextInput style={styles.input} placeholder="Target Amount (PKR)" keyboardType="numeric" value={targetAmount} onChangeText={setTargetAmount} />
      <Button title="Add Goal" onPress={add} />

      <FlatList
        style={{ marginTop: 12 }}
        data={goals}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => {
          const pct = Math.min(100, Math.round((item.saved / item.targetAmount) * 100));
          return (
            <View style={styles.goal}>
              <Text style={styles.goalTitle}>{item.name} • {item.year}</Text>
              <Text>{item.saved.toLocaleString()} / {item.targetAmount.toLocaleString()} PKR ({pct}%)</Text>
              <View style={styles.row}>
                <Button title="Quick Save +1,000" onPress={() => save(item.id)} />
                <Button title="Remove" onPress={() => remove(item.id)} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
  row:{ flexDirection:'row', gap:10, marginVertical:8, alignItems:'center' },
  input:{ borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:8, flex:1 },
  goal:{ borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:10, marginBottom:10 },
  goalTitle:{ fontSize:16, fontWeight:'600', marginBottom:4 },
});

export default HajjGoalsScreen;
