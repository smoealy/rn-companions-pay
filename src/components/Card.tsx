import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';

const Card: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing(1.5),
  },
});

export default Card;
