import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { WalletService } from '../services/WalletService';
import type { Currency } from '../services/WalletService';

const SendMoneyScreen: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [amount, setAmount] = useState('2000');
  const [recipient, setRecipient] = useState('+92XXXXXXXXXX');

  const handleSend = async () => {
    try {
      await WalletService.sendToFamily(currency, Number(amount || 0), recipient);
      alert(`Sent ${amount} ${currency} to ${recipient}`);
    } catch (e: any) {
      alert(e.message || 'Send failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Send to Family</Text>
      <TextInput value={recipient} onChangeText={setRecipient} style={styles.input} placeholder="Recipient mobile" />
      <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} placeholder="Amount" />
      <Picker selectedValue={currency} onValueChange={(v)=>setCurrency(v)}>
        <Picker.Item label="PKR" value="PKR" /><Picker.Item label="SAR" value="SAR" />
        <Picker.Item label="AED" value="AED" /><Picker.Item label="USD" value="USD" />
      </Picker>
      <Button title="Send" onPress={handleSend} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{flex:1,padding:20,gap:12},
  title:{fontSize:22,fontWeight:'600'},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:8,marginVertical:8},
});

export default SendMoneyScreen;

