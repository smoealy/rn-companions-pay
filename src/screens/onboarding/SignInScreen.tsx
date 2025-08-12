import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const SignInScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { signInAnonymously } = useAuth();
  const handle = async () => {
    await signInAnonymously();
    navigation.navigate('ChooseJourney');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Button title="Sign In Anonymously" onPress={handle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});

export default SignInScreen;
