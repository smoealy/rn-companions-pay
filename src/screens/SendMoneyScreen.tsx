import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApp, Currency } from '../contexts/AppContext';

const SendMoneyScreen: React.FC = () => {
  const { sendMoney } = useApp();
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>('');

  const handleSend = () => {
    if (amount > 0) {
      sendMoney(amount, currency);
      alert(`Sent ${amount} ${currency} to ${recipient || 'family member'}!`);
      setAmount(0);
      setRecipient('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Money</Text>
      <TextInput
        placeholder="Recipient (phone)"
        value={recipient}
        onChangeText={setRecipient}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount.toString()}
        onChangeText={(text) => setAmount(Number(text) || 0)}
        style={styles.input}
      />
      <Picker selectedValue={currency} onValueChange={(item) => setCurrency(item as Currency)}>
        <Picker.Item label="PKR" value="PKR" />
        <Picker.Item label="SAR" value="SAR" />
        <Picker.Item label="AED" value="AED" />
        <Picker.Item label="USD" value="USD" />
      </Picker>
      <Button title="Send" onPress={handleSend} />
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

export default SendMoneyScreen;
