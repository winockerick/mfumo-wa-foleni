import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Here you would normally handle login logic
    // For now, just navigate to Service Centers tab
    router.replace('/(tabs)/vituo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingia</Text>
      <Text style={styles.subtitle}>Karibu tena!</Text>

      <Text style={styles.label}>Namba ya Simu</Text>
      <TextInput
        style={styles.input}
        placeholder="Mfano: 0712345678"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Nenosiri</Text>
      <TextInput
        style={styles.input}
        placeholder="Nenosiri"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingia</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Huna akaunti?{' '}
        <Link href="/" style={styles.registerLink}>Jiunge</Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#7B2FF2', marginBottom: 4 },
  subtitle: { fontSize: 18, color: '#333', marginBottom: 24 },
  label: { fontSize: 14, color: '#333', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#7B2FF2', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerText: { textAlign: 'center', marginTop: 24, fontSize: 16 },
  registerLink: { color: '#7B2FF2', fontWeight: 'bold' },
}); 