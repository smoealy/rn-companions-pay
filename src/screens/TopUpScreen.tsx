import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const TopUpScreen: React.FC = () => {
  const [amount, setAmount] = useState('');

  const handleTopUp = () => {
    const value = Number(amount);
    if (value > 0) {
      // In a real app, integrate payment provider (e.g., Stripe, PayPal)
      alert(`Top up of ${value} requested. Payment integration pending.`);
      setAmount('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Up Balance</Text>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Top Up" onPress={handleTopUp} />
    </View>
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

export default TopUpScreen;
