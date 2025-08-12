import React from 'react';
import { Text, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useOnboarding } from '../../contexts/OnboardingContext';
import { useAuth } from '../../contexts/AuthContext';

// Pull Firestore handles from the local wrapper (no direct firebase/* imports)
import { db, doc, setDoc } from '../../services/firebase';

const FinishScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const { profile } = useOnboarding();
  const { user } = useAuth();

  const finish = async () => {
    try {
      // Save locally for immediate UX
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      const goal = { year: profile.year, travelers: profile.travelers, budget: profile.budget };
      await AsyncStorage.setItem('firstGoal', JSON.stringify(goal));

      // If Firebase is configured and we have a user, also persist to Firestore
      if (db && user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, profile, { merge: true });
        await setDoc(doc(userRef, 'goals', 'first'), goal, { merge: true });
      }

      onFinish();
    } catch (e) {
      console.warn('Finish onboarding failed:', e);
      Alert.alert('Oops', 'We could not finish onboarding. Please try again.');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Text style={styles.title}>All Set!</Text>
      <Button title="Finish" onPress={finish} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});

export default FinishScreen;
