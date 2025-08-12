import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../contexts/AppContext';

const CardLoadScreen: React.FC = () => {
  const { convertCurrency } = useApp();
  const [amount, setAmount] = useState('');

  const handleLoad = () => {
    const value = Number(amount);
    if (value > 0) {
      // For demonstration, we simply move funds from PKR to PKR (no effect)
      convertCurrency('PKR', 'PKR', value);
      alert(`Loaded ${value} PKR onto your card!`);
      setAmount('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Load Companions Card</Text>
      <TextInput
        placeholder="Amount (PKR)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Load" onPress={handleLoad} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default CardLoadScreen;
