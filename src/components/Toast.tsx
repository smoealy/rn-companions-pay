import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Toast: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box:{ position:'absolute', bottom:20, left:20, right:20, backgroundColor:'#222', padding:12, borderRadius:10 },
  text:{ color:'#fff', textAlign:'center' }
});
