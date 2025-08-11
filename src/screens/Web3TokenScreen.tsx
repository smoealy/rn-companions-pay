import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Web3 } from '../services/web3';

const Web3TokenScreen: React.FC = () => {
  const [addr, setAddr] = useState('');
  const [symbol, setSymbol] = useState('IHRAM');
  const [balance, setBalance] = useState('0');

  const load = async () => {
    const w = Web3.wallet();
    setAddr(w?.address || '(not connected)');
    const t = await Web3.tokenInfo();
    setSymbol(t.symbol);
    setBalance(await Web3.balanceOf(w?.address));
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>On-chain Token</Text>
      <Text>Wallet: {addr}</Text>
      <Text>Balance: {balance} {symbol}</Text>
      <Button title="Refresh" onPress={load} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
});

export default Web3TokenScreen;
