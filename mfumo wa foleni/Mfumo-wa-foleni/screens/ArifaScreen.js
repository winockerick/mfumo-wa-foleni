import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ArifaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arifa</Text>
      <Text>Hapa utaona arifa zako.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B2FF2',
    marginBottom: 10,
  },
}); 