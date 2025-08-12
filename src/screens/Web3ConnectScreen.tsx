import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Switch, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { AppStackParamList } from '../types';
import { Flags } from '../services/Flags';

type Nav = StackNavigationProp<AppStackParamList>;

const Web3ConnectScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const [enabled, setEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Flags.getWeb3().then(setEnabled).catch(() => {});
  }, []);

  const toggle = async (val: boolean) => {
    setEnabled(val);
    try { await Flags.setWeb3(val); } catch {}
  };

  const goToApp = async (finalEnabled: boolean) => {
    if (saving) return;
    setSaving(true);
    try {
      // persist the final choice + onboarding flag
      await Flags.setWeb3(finalEnabled);
      await AsyncStorage.setItem('onboarded', '1');

      // jump straight into Tabs → Dashboard
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              state: { index: 0, routes: [{ name: 'Dashboard' }] } as any
            }
          ],
        })
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Text style={styles.title}>Enable Web3 (optional)</Text>
      <Text style={styles.subtitle}>
        Turn on Web3 wallet features for token balance and transfers. You can change this later in Settings.
      </Text>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Web3 Features</Text>
        <Switch value={enabled} onValueChange={toggle} />
      </View>

      <View style={styles.actions}>
        <Button title={saving ? 'Loading…' : 'Continue'} onPress={() => goToApp(enabled)} disabled={saving} />
        <View style={{ height: 10 }} />
        <Button title="Skip for now" onPress={() => goToApp(false)} disabled={saving} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: 16 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  switchLabel: { fontSize: 16, fontWeight: '600' },
  actions: { marginTop: 4 }
});

export default Web3ConnectScreen;
