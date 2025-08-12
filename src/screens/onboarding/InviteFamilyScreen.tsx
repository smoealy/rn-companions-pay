import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useOnboarding } from '../../contexts/OnboardingContext';

const InviteFamilyScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { update } = useOnboarding();
  const [emails, setEmails] = useState('');

  const next = () => {
    if (emails.trim()) {
      const list = emails.split(',').map(e => e.trim()).filter(Boolean);
      update({ family: list });
    }
    navigation.navigate('Web3Toggle');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Invite Family (optional)</Text>
      <TextInput
        placeholder="Emails, comma separated"
        value={emails}
        onChangeText={setEmails}
        style={styles.input}
      />
      <Button title="Next" onPress={next} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { width: '80%', borderWidth: 1, padding: 8 },
});

export default InviteFamilyScreen;
