import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
// Picker is not exported by default in latest RN; but we include for demonstration purposes
import { Picker } from '@react-native-picker/picker';
import { useApp, Currency } from '../contexts/AppContext';

const WalletScreen: React.FC = () => {
  const { balances, convertCurrency } = useApp();
  const [fromCurrency, setFromCurrency] = useState<Currency>('PKR');
  const [toCurrency, setToCurrency] = useState<Currency>('SAR');
  const [amount, setAmount] = useState<number>(0);

  const handleConvert = () => {
    if (fromCurrency === toCurrency) return;
    convertCurrency(fromCurrency, toCurrency, amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Balances</Text>
      {Object.entries(balances).map(([cur, val]) => (
        <Text key={cur} style={styles.balance}>{cur}: {val.toFixed(2)}</Text>
      ))}
      <View style={styles.converter}>
        <Text>Select currencies and amount to convert:</Text>
        {/* NOTE: Using Picker from react-native (deprecated) for demonstration; in real RN use @react-native-picker/picker */}
        <Picker
          selectedValue={fromCurrency}
          onValueChange={(itemValue) => setFromCurrency(itemValue as Currency)}
        >
          <Picker.Item label="PKR" value="PKR" />
          <Picker.Item label="SAR" value="SAR" />
          <Picker.Item label="AED" value="AED" />
          <Picker.Item label="USD" value="USD" />
        </Picker>
        <Picker
          selectedValue={toCurrency}
          onValueChange={(itemValue) => setToCurrency(itemValue as Currency)}
        >
          <Picker.Item label="PKR" value="PKR" />
          <Picker.Item label="SAR" value="SAR" />
          <Picker.Item label="AED" value="AED" />
          <Picker.Item label="USD" value="USD" />
        </Picker>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Use TextInput from react-native instead of HTML input for mobile */}
          <TextInput
            keyboardType="numeric"
            value={amount.toString()}
            onChangeText={(text) => setAmount(Number(text) || 0)}
            style={{ borderWidth: 1, padding: 8, marginRight: 8, minWidth: 100 }}
            placeholder="Amount"
          />
          <Button title="Convert" onPress={handleConvert} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  balance: { fontSize: 16, marginVertical: 4 },
  converter: { marginTop: 20 },
});

export default WalletScreen;
