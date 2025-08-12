import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/firebase';

const FinishScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const { profile } = useOnboarding();
  const { user } = useAuth();

  const finish = async () => {
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    const goal = { year: profile.year, travelers: profile.travelers, budget: profile.budget };
    await AsyncStorage.setItem('firstGoal', JSON.stringify(goal));
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, profile, { merge: true });
      await setDoc(doc(userRef, 'goals', 'first'), goal);
    }
    onFinish();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Set!</Text>
      <Button title="Finish" onPress={finish} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});

export default FinishScreen;
