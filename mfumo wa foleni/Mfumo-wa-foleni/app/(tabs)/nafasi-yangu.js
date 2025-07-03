import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import the same queue state as in service-center-details.js
const serviceCenters = [
  {
    id: '1',
    name: 'Hospitali ya Muhimbili',
    location: 'Dar es Salaam',
    wait: 45,
  },
  {
    id: '2',
    name: 'TTCL Makao Makuu',
    location: 'Dar es Salaam',
    wait: 25,
  },
  {
    id: '3',
    name: 'Benki ya NMB - Tawi la Kariakoo',
    location: 'Kariakoo, Dar es Salaam',
    wait: 65,
  },
  {
    id: '4',
    name: 'Ofisi ya Uhamiaji',
    location: 'Dar es Salaam',
    wait: 10,
  },
];

// Must match the one in service-center-details.js
if (!global.userQueueState) global.userQueueState = {};
const userQueueState = global.userQueueState;

export default function NafasiYanguScreen() {
  const [reservations, setReservations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Build reservation list from userQueueState
    const reserved = Object.entries(userQueueState).map(([id, token]) => {
      const center = serviceCenters.find(c => c.id === id);
      if (!center) return null;
      return {
        id,
        name: center.name,
        location: center.location,
        wait: center.wait,
        token,
        date: new Date().toLocaleString('sv-SE', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'long', year: 'numeric' }),
      };
    }).filter(Boolean);
    setReservations(reserved);
  }, []);

  const handleRemove = (id) => {
    Alert.alert('Futa Nafasi', 'Una uhakika unataka kufuta nafasi hii?', [
      { text: 'Hapana' },
      { text: 'Ndiyo', onPress: () => {
        delete userQueueState[id];
        setReservations(reservations.filter(r => r.id !== id));
      }}
    ]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#faf9ff' }}>
      <Text style={styles.header}>Nafasi Yangu</Text>
      <Text style={styles.subHeader}>Zamu Zinazoendelea</Text>
      {reservations.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>Huna nafasi yoyote kwenye foleni.</Text>
      ) : (
        reservations.map(res => (
          <View key={res.id} style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.centerName}>{res.name}</Text>
                <Text style={styles.date}><Ionicons name="calendar-outline" size={15} color="#7B2FF2" /> {res.date}</Text>
              </View>
              <TouchableOpacity style={styles.unsubscribeBtn}>
                <Text style={styles.unsubscribeText}>Unasubiri</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.token}>{res.token}</Text>
                <Text style={styles.infoLabel}>Namba ya Tiketi</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color="#7B2FF2" />
                <Text style={styles.waitTime}>{res.wait} dakika</Text>
                <Text style={styles.infoLabel}>Muda wa Kusubiri</Text>
              </View>
            </View>
            <View style={styles.alertRow}>
              <Ionicons name="alert-circle-outline" size={18} color="#e6b800" style={{ marginRight: 4 }} />
              <Text style={styles.alertText}>Utaarifiwa dakika 10 kabla ya zamu yako</Text>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(res.id)}>
              <Text style={styles.removeBtnText}>Futa Nafasi</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 24, fontWeight: 'bold', color: '#7B2FF2', marginTop: 24, marginBottom: 0, marginLeft: 24 },
  subHeader: { fontSize: 17, fontWeight: 'bold', color: '#222', marginTop: 16, marginBottom: 12, marginLeft: 24 },
  card: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 24, marginBottom: 18, padding: 18, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  centerName: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  date: { color: '#888', fontSize: 14, marginTop: 2 },
  unsubscribeBtn: { backgroundColor: '#ffe6a1', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 12 },
  unsubscribeText: { color: '#e6b800', fontWeight: 'bold', fontSize: 13 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  infoItem: { alignItems: 'center', flex: 1 },
  token: { fontSize: 28, fontWeight: 'bold', color: '#7B2FF2' },
  waitTime: { fontSize: 18, fontWeight: 'bold', color: '#7B2FF2', marginTop: 2 },
  infoLabel: { color: '#666', fontSize: 13, marginTop: 2 },
  alertRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  alertText: { color: '#e6b800', fontSize: 14 },
  removeBtn: { borderWidth: 1, borderColor: '#7B2FF2', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 8 },
  removeBtnText: { color: '#7B2FF2', fontWeight: 'bold', fontSize: 16 },
}); 