import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { WalletService } from '../services/WalletService';

const TopUpScreen: React.FC = () => {
  const [amount, setAmount] = useState('5000');

  const handleTopUp = async () => {
    await WalletService.topUpPKR(Number(amount || 0));
    alert(`Top up of PKR ${amount} (stub)`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Up (PKR)</Text>
      <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} placeholder="Amount" />
      <Button title="Top Up" onPress={handleTopUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1,padding:20,gap:12},
  title:{fontSize:22,fontWeight:'600'},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:8,marginVertical:8},
});

export default TopUpScreen;
