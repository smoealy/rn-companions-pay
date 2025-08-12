import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useOnboarding } from '../../contexts/OnboardingContext';

const GoalBasicsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { update } = useOnboarding();
  const [year, setYear] = useState('');
  const [travelers, setTravelers] = useState('');
  const [budget, setBudget] = useState('');

  const next = () => {
    update({ year, travelers, budget });
    navigation.navigate('InviteFamily');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Goal Basics</Text>
      <TextInput placeholder="Year" value={year} onChangeText={setYear} style={styles.input} />
      <TextInput placeholder="Travelers" value={travelers} onChangeText={setTravelers} style={styles.input} />
      <TextInput placeholder="Budget" value={budget} onChangeText={setBudget} style={styles.input} />
      <Button title="Next" onPress={next} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { width: '80%', borderWidth: 1, padding: 8 },
});

export default GoalBasicsScreen;
