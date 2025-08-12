import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Web3 } from '../services/web3';

const Web3TransferScreen: React.FC = () => {
  const [to, setTo] = useState('0x...');
  const [amount, setAmount] = useState('1.0');
  const [tx, setTx] = useState('');

  const send = async () => {
    try {
      const res = await Web3.transfer(to, amount);
      setTx(res.hash);
      alert('Transfer submitted (stub).');
    } catch (e: any) {
      alert(e?.message || 'Transfer failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Send IHRAM Token</Text>
      <TextInput style={styles.input} placeholder="Recipient address" value={to} onChangeText={setTo} />
      <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
      <Button title="Send" onPress={send} />
      {!!tx && <Text style={styles.hash}>Tx: {tx}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
  input:{ borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:8 },
  hash:{ marginTop:8, color:'#555' },
});

export default Web3TransferScreen;
