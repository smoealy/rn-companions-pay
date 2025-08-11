import React, { useEffect, useState } from 'react';
import { Zindigi } from '../services/zindigi';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { WalletService, Currency, Balances } from '../services/WalletService';

const WalletScreen: React.FC = () => {
  const [balances, setBalances] = useState<Balances>({ PKR:0, SAR:0, AED:0, USD:0 });
  const [fromCurrency, setFromCurrency] = useState<Currency>('PKR');
  const [toCurrency, setToCurrency] = useState<Currency>('SAR');
  const [amount, setAmount] = useState<string>('1000');

  useEffect(() => {
    WalletService.getBalances().then(setBalances);
  }, []);

  const handleConvert = async () => {
    try {
      const updated = await WalletService.convert(fromCurrency, toCurrency, Number(amount || 0));
      setBalances(updated);
    } catch (e: any) {
      alert(e.message || 'Conversion failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multi-Currency Wallet</Text>

      {(['PKR','SAR','AED','USD'] as Currency[]).map((c)=>(
        <Text key={c} style={styles.line}>{c}: {balances[c].toFixed(2)}</Text>
      ))}

      <View style={styles.row}>
        <Picker selectedValue={fromCurrency} onValueChange={(v)=>setFromCurrency(v)}>
          <Picker.Item label="PKR" value="PKR" /><Picker.Item label="SAR" value="SAR" />
          <Picker.Item label="AED" value="AED" /><Picker.Item label="USD" value="USD" />
        </Picker>
        <Picker selectedValue={toCurrency} onValueChange={(v)=>setToCurrency(v)}>
          <Picker.Item label="PKR" value="PKR" /><Picker.Item label="SAR" value="SAR" />
          <Picker.Item label="AED" value="AED" /><Picker.Item label="USD" value="USD" />
        </Picker>
      </View>

      <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} placeholder="Amount" />
      <Button title="Convert" onPress={handleConvert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1,padding:20,gap:12},
  title:{fontSize:22,fontWeight:'600'},
  row:{flexDirection:'row',gap:12,alignItems:'center'},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:8,marginVertical:8},
  line:{fontSize:16}
});

export default WalletScreen;
