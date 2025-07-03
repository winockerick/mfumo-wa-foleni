import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';

const serviceCenters = [
  {
    id: '1',
    name: 'Hospitali ya Muhimbili',
    location: 'Dar es Salaam',
    queue: 15,
    wait: 45,
    hours: '08:00 - 17:00',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
  {
    id: '2',
    name: 'TTCL Makao Makuu',
    location: 'Dar es Salaam',
    queue: 8,
    wait: 25,
    hours: '08:30 - 16:30',
    image: 'https://images.pexels.com/photos/1181696/pexels-photo-1181696.jpeg',
  },
  {
    id: '3',
    name: 'Benki ya NMB - Tawi la Kariakoo',
    location: 'Kariakoo, Dar es Salaam',
    queue: 22,
    wait: 65,
    hours: '08:00 - 16:00',
    image: 'https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg',
  },
  {
    id: '4',
    name: 'Ofisi ya Uhamiaji',
    location: 'Dar es Salaam',
    queue: 5,
    wait: 10,
    hours: '09:00 - 15:00',
    image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
  },
];

if (!global.queueCounts) {
  global.queueCounts = {};
  serviceCenters.forEach(c => {
    global.queueCounts[c.id] = c.queue;
  });
}
const queueCounts = global.queueCounts;

export default function VituoScreen() {
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(0);
  const router = useRouter();

  // Refresh when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setRefresh(r => r + 1);
    }, [])
  );

  // Also refresh when queueCounts change (simulate global event)
  useEffect(() => {
    const interval = setInterval(() => setRefresh(r => r + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCenters = serviceCenters.filter(center =>
    center.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Ionicons name="aperture" size={24} color="#7B2FF2" style={{ marginRight: 8 }} />
        <Text style={styles.header}>Vituo vya Huduma</Text>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tafuta kituo..."
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
      </View>
      {/* List */}
      <FlatList
        data={filteredCenters}
        keyExtractor={item => item.id}
        extraData={refresh}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/service-center-details', params: { id: item.id } })}
          >
            <Text style={styles.centerName}>{item.name}</Text>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color="#7B2FF2" style={{ marginRight: 4 }} />
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Ionicons name="people-outline" size={18} color="#7B2FF2" />
                <Text style={styles.statusText}>{queueCounts[item.id]} <Text style={styles.statusLabel}>Waliopo Foleni</Text></Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons name="time-outline" size={18} color="#7B2FF2" />
                <Text style={styles.statusText}>{item.wait} <Text style={styles.statusLabel}>dakika</Text> <Text style={styles.statusLabel}>Muda wa Kusubiri</Text></Text>
              </View>
            </View>
            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={16} color="#7B2FF2" style={{ marginRight: 4 }} />
              <Text style={styles.hours}>Saa za Kazi: {item.hours}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9ff', paddingHorizontal: 0, paddingTop: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 24, marginBottom: 8 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  centerName: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  location: { color: '#666', fontSize: 14 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  statusItem: { flexDirection: 'row', alignItems: 'center' },
  statusText: { marginLeft: 4, fontSize: 16, color: '#222' },
  statusLabel: { color: '#666', fontSize: 13 },
  hours: { color: '#666', fontSize: 14 },
}); 