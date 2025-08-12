import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, Switch } from 'react-native';
import { useOnboarding } from '../../contexts/OnboardingContext';

const Web3ToggleScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { update, profile } = useOnboarding();
  const [enabled, setEnabled] = useState(profile.web3 ?? false);

  const next = () => {
    update({ web3: enabled });
    navigation.navigate('Finish');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enable Web3 features?</Text>
      <Switch value={enabled} onValueChange={setEnabled} />
      <Button title="Next" onPress={next} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});

export default Web3ToggleScreen;
