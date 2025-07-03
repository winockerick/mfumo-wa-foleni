import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    // Here you would normally handle registration logic
    // For now, just navigate to login
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mfumo wa Foleni</Text>
      <Text style={styles.subtitle}>Jiunge na sisi</Text>

      <Text style={styles.label}>Jina Kamili</Text>
      <TextInput
        style={styles.input}
        placeholder="Andika jina lako kamili"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Namba ya Simu</Text>
      <TextInput
        style={styles.input}
        placeholder="Mfano: 0712345678"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Barua Pepe (Si lazima)</Text>
      <TextInput
        style={styles.input}
        placeholder="mfano@barua.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Jiunge</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Una akaunti tayari?{' '}
        <Link href="/login" style={styles.loginLink}>Ingia</Link>
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
  loginText: { textAlign: 'center', marginTop: 24, fontSize: 16 },
  loginLink: { color: '#7B2FF2', fontWeight: 'bold' },
}); 