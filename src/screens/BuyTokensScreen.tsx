import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';

type Nav = NativeStackNavigationProp<AppStackParamList, 'BuyTokens'>;

interface TokenPackage { id: string; tokens: number; price: number; creditPkr: number; }
const packages: TokenPackage[] = [
  { id: 'p1', tokens: 100,  price: 10, creditPkr: 2500 },
  { id: 'p2', tokens: 500,  price: 45, creditPkr: 12000 },
  { id: 'p3', tokens: 1000, price: 80, creditPkr: 22000 },
];

const BuyTokensScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>('p1');
  const pkg = packages.find(p => p.id === selected)!;

  const handleContinue = () => {
    navigation.navigate('Checkout', { tokens: pkg.tokens, price: pkg.price, creditPkr: pkg.creditPkr });
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
            <Text style={styles.note}>Will credit ≈ {item.creditPkr.toLocaleString()} PKR</Text>
          </TouchableOpacity>
        )}
      />

      <Button title={`Continue ($${pkg.price})`} onPress={handleContinue} />
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
  note:{ marginTop:4, color:'#666' },
});

export default BuyTokensScreen;
