import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Flags } from '../services/Flags';
import { TransactionService } from '../services/TransactionService';
import { Flags } from '../services/Flags';
import { HajjService } from '../services/HajjService';

const SettingsScreen: React.FC = () => {
  const [env, setEnv] = useState<'pilot' | 'production'>('pilot');
const [web3, setWeb3] = useState(false);

  useEffect(() => {
    Flags.getEnv().then(setEnv);
    Flags.getWeb3().then(setWeb3);
  }, []);

  const toggleEnv = async () => {
    const next = env === 'pilot' ? 'production' : 'pilot';
    await Flags.setEnv(next);
    setEnv(next);
  };

  const resetData = async () => {
    await TransactionService.clear();
    // Clear Hajj goals by setting empty array
    await HajjService.remove('ALL_RESET_SENTINEL' as any); // ensure method exists; else:
    // If remove doesn't accept sentinel, do:
    // await AsyncStorage.setItem('hajj_goals_v1', JSON.stringify([]));
    alert('Local data cleared (transactions & goals).');
  };

  
  return (
   
    <View style={styles.card}>
  <Text style={styles.label}>Web3 (optional)</Text>
  <Text>Enabled: {String(web3)}</Text>
  <Button title={web3 ? 'Disable Web3' : 'Enable Web3'} onPress={async () => setWeb3(await Flags.setWeb3(!web3))} />
</View>
    
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Environment</Text>
        <Text>Current: {env}</Text>
        <Button title={`Switch to ${env === 'pilot' ? 'production' : 'pilot'}`} onPress={toggleEnv} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Development</Text>
        <Button title="Clear Local Data" onPress={resetData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, gap:12 },
  title:{ fontSize:22, fontWeight:'600' },
  card:{ borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:10, marginTop:10, gap:8 },
  label:{ fontWeight:'600' },
});

export default SettingsScreen;
