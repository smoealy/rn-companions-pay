import React, { useEffect, useState } from 'react';
import { Zindigi } from '../services/zindigi';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { WalletService, Currency, Balances } from '../services/WalletService';

const WalletScreen: React.FC = () => {
  const [balances, setBalances] = useState<Balances>({ PKR:0, SAR:0, AED:0, USD:0 });
  const [fromCurrency, setFromCurrency] = useState<Currency>('PKR');
  const [toCurrency, setToCurrency] = useState<Currency>('SAR');
  const [quote, setQuote] = useState<string>('');
  const [amount, setAmount] = useState<string>('1000');
  const [loading, setLoading] = useState(false);

  const loadBalances = async () => {
    setLoading(true);
    try { setBalances(await WalletService.getBalances()); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadBalances(); }, []);

  const preview = async () => {
    try {
      const q = await Zindigi.getQuote(fromCurrency, toCurrency);
      setQuote(`1 ${q.from} ≈ ${q.rate} ${q.to} (valid 60s)`);
    } catch {
      setQuote('Unable to fetch quote right now');
    }
  };

  const handleConvert = async () => {
    const amt = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    if (amt <= 0) return;
    try {
      const updated = await WalletService.convert(fromCurrency, toCurrency, amt);
      setBalances(updated);
      setQuote(''); // clear after conversion
    } catch (e: any) {
      alert(e?.message || 'Conversion failed');
    }
  };

  const onFrom = (v: Currency) => { setFromCurrency(v); setQuote(''); };
  const onTo = (v: Currency) => { setToCurrency(v); setQuote(''); };

  const amt = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
  const convertDisabled = !amount || isNaN(amt) || amt <= 0 || loading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multi-Currency Wallet</Text>
      <Button title={loading ? 'Refreshing…' : 'Refresh Balances'} disabled={loading} onPress={loadBalances} />

      {(['PKR','SAR','AED','USD'] as Currency[]).map((c)=>(
        <Text key={c} style={styles.line}>{c}: {balances[c].toFixed(2)}</Text>
      ))}

      <View style={styles.row}>
        <Picker selectedValue={fromCurrency} onValueChange={onFrom} style={{ flex: 1 }}>
          <Picker.Item label="PKR" value="PKR" /><Picker.Item label="SAR" value="SAR" />
          <Picker.Item label="AED" value="AED" /><Picker.Item label="USD" value="USD" />
        </Picker>
        <Picker selectedValue={toCurrency} onValueChange={onTo} style={{ flex: 1 }}>
          <Picker.Item label="PKR" value="PKR" /><Picker.Item label="SAR" value="SAR" />
          <Picker.Item label="AED" value="AED" /><Picker.Item label="USD" value="USD" />
        </Picker>
      </View>

      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Amount"
      />
      <Button title="Preview FX Quote" onPress={preview} />
      {!!quote && <Text>{quote}</Text>}
      <Button title="Convert" onPress={handleConvert} disabled={convertDisabled} />
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
