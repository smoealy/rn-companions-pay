import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Welcome to Companions Pay</Text>
    <Button title="Get Started" onPress={() => navigation.navigate('SignIn')} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});

export default WelcomeScreen;
