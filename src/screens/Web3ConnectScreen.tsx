import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Web3 } from '../services/web3';

const Web3ConnectScreen: React.FC = () => {
  const [connected, setConnected] = useState(!!Web3.wallet());
  const [address, setAddress] = useState(Web3.wallet()?.address || '');

  const connect = async () => {
    const w = await Web3.connect();
    setConnected(true);
    setAddress(w.address);
  };
  const disconnect = async () => {
    await Web3.disconnect();
    setConnected(false);
    setAddress('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Web3 Wallet</Text>
      {connected ? (
        <>
          <Text>Connected: {address}</Text>
          <Button title="Disconnect" onPress={disconnect} />
        </>
      ) : (
        <Button title="Connect Wallet (stub)" onPress={connect} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
});

export default Web3ConnectScreen;
