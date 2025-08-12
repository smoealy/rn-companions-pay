import React, { useState } from 'react';
import { Text, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../types';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { useAuth } from '../../contexts/AuthContext';
import { db, doc, setDoc } from '../../services/firebase';

type Nav = StackNavigationProp<AppStackParamList, any>;
type Props = { navigation: Nav; onFinish?: () => void };

const FinishScreen: React.FC<Props> = ({ navigation, onFinish }) => {
  const { profile } = useOnboarding();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const finish = async () => {
    if (saving) return;
    setSaving(true);
    try {
      // Persist locally
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      const goal = { year: profile.year, travelers: profile.travelers, budget: profile.budget };
      await AsyncStorage.setItem('firstGoal', JSON.stringify(goal));

      // Persist to Firestore if configured + signed in
      if (db && user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, profile, { merge: true });
        await setDoc(doc(userRef, 'goals', 'first'), goal, { merge: true });
      }

      // Prefer navigator reset to land on Tabs cleanly
      if (navigation?.reset) {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else if (navigation?.replace) {
        navigation.replace('Home');
      }

      // Still call optional prop if you’re using a wizard wrapper
      onFinish?.();
    } catch (e) {
      console.warn('Finish onboarding failed:', e);
      Alert.alert('Oops', 'We could not finish onboarding. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Text style={styles.title}>All Set!</Text>
      <Button title={saving ? 'Finishing…' : 'Finish'} onPress={finish} disabled={saving} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});

export default FinishScreen;
