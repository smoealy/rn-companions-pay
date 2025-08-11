import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { WalletService } from '../services/WalletService';

interface TokenPackage { id: string; tokens: number; price: number; }
const packages: TokenPackage[] = [
  { id: 'p1', tokens: 100, price: 10 },
  { id: 'p2', tokens: 500, price: 45 },
  { id: 'p3', tokens: 1000, price: 80 },
];

const BuyTokensScreen: React.FC = () => {
  const [selected, setSelected] = useState<string>('p1');

  const pkg = packages.find(p => p.id === selected)!;

  const handleContinue = async () => {
    // later: open WebView to PayPal/Stripe; on success call WalletService.topUpPKR(amountInPKR)
    await WalletService.addPoints(Math.floor(pkg.price / 5)); // small reward on purchase
    alert(`Stub: Begin checkout for ${pkg.tokens} credits @ $${pkg.price}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Ihram Credits</Text>

      <FlatList
        data={packages}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item.id)} style={[styles.card, selected === item.id && styles.cardActive]}>
            <Text style={styles.name}>{item.tokens} Credits</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title={`Continue ($${pkg.price})`} onPress={handleContinue} />
      <Text style={styles.note}>Later: replace with WebView or native SDK checkout flow.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
  card:{ borderWidth:1, borderColor:'#ddd', padding:14, borderRadius:10, marginBottom:10 },
  cardActive:{ borderColor:'#4a67ff' },
  name:{ fontSize:16, fontWeight:'600' },
  price:{ marginTop:6 },
  note:{ marginTop:10, color:'#666' },
});

export default BuyTokensScreen;

