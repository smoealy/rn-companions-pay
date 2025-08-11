import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import { useApp } from '../contexts/AppContext';

const HajjGoalsScreen: React.FC = () => {
  const { hajjGoals, addHajjGoal } = useApp();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [year, setYear] = useState('');

  const handleAddGoal = () => {
    const target = Number(targetAmount);
    const goalYear = Number(year);
    if (name && target > 0 && goalYear > 0) {
      addHajjGoal({ name, targetAmount: target, saved: 0, year: goalYear });
      setName('');
      setTargetAmount('');
      setYear('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hajj Savings Goals</Text>
      <FlatList
        data={hajjGoals}
        keyExtractor={(item) => item.name + item.year}
        ListEmptyComponent={<Text>No goals yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text>{item.name} ({item.year})</Text>
            <Text>Saved: {item.saved} / Target: {item.targetAmount}</Text>
          </View>
        )}
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.subtitle}>Add a new goal</Text>
      <TextInput
        placeholder="Goal name (e.g., Hajj 2027)"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Target amount"
        value={targetAmount}
        onChangeText={setTargetAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Year"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Goal" onPress={handleAddGoal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  subtitle: { fontSize: 16, marginTop: 20, marginBottom: 10 },
  goalItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default HajjGoalsScreen;
