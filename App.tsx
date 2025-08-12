import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>✅ Minimal Expo 53 app is running</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
