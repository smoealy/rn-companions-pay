import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import { useOnboarding } from '../../contexts/OnboardingContext';

const ChooseJourneyScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { update } = useOnboarding();
  const choose = (journey: 'Hajj' | 'Umrah' | 'Later') => {
    update({ journey });
    navigation.navigate('GoalBasics');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Journey</Text>
      <Button title="Hajj" onPress={() => choose('Hajj')} />
      <Button title="Umrah" onPress={() => choose('Umrah')} />
      <Button title="Later" onPress={() => choose('Later')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});

export default ChooseJourneyScreen;
