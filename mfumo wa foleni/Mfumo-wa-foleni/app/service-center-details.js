import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

// Store queue state in memory for the session
if (!global.userQueueState) global.userQueueState = {};
if (!global.queueCounts) global.queueCounts = {};
const userQueueState = global.userQueueState;
const queueCounts = global.queueCounts;

export default function ServiceCenterDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const center = serviceCenters.find(c => c.id === id);

  // Track user's token for this center in session
  const [userToken, setUserToken] = useState(null);
  // Track the current queue size (starts from hardcoded value)
  const [queueCount, setQueueCount] = useState(center ? (queueCounts[center.id] ?? center.queue) : 0);

  useEffect(() => {
    if (id && userQueueState[id]) {
      setUserToken(userQueueState[id]);
      setQueueCount(queueCounts[center.id] ?? center.queue);
    }
  }, [id]);

  if (!center) {
    return (
      <View style={styles.centered}>
        <Text>Service Center Not Found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ color: '#7B2FF2' }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleJoinQueue = () => {
    let newToken = userToken;
    let newQueueCount = queueCount;
    if (userToken == null) {
      // First time joining: token is next in queue
      newToken = (queueCounts[center.id] ?? center.queue) + 1;
      newQueueCount = newToken;
    } else {
      // Already in queue: add another spot
      newToken = userToken + 1;
      newQueueCount = newToken;
    }
    userQueueState[id] = newToken;
    queueCounts[center.id] = newQueueCount;
    setUserToken(newToken);
    setQueueCount(newQueueCount);
    Alert.alert('Umejiunga na foleni!', `Namba yako ya tiketi ni ${newToken}`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#faf9ff' }}>
      <View style={styles.headerImgWrap}>
        <Image source={{ uri: center.image }} style={styles.headerImg} />
        <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContent}>
        <Text style={styles.centerName}>{center.name}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={18} color="#7B2FF2" style={{ marginRight: 4 }} />
          <Text style={styles.location}>{center.location}</Text>
        </View>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Hali ya Foleni</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Ionicons name="people-outline" size={22} color="#7B2FF2" />
            <Text style={styles.statusText}>{queueCount}</Text>
            <Text style={styles.statusLabel}>Waliopo Foleni</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="time-outline" size={22} color="#7B2FF2" />
            <Text style={styles.statusText}>{center.wait}</Text>
            <Text style={styles.statusLabel}>dakika{"\n"}Muda wa Kusubiri</Text>
          </View>
        </View>
        {userToken && (
          <View style={styles.tokenBox}>
            <Ionicons name="pricetag" size={20} color="#7B2FF2" style={{ marginRight: 6 }} />
            <Text style={styles.tokenText}>Namba yako ya tiketi: <Text style={{ fontWeight: 'bold' }}>{userToken}</Text></Text>
          </View>
        )}
      </View>
      <View style={styles.sectionCard}>
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={18} color="#7B2FF2" style={{ marginRight: 4 }} />
          <Text style={styles.sectionTitle}>Saa za Kazi</Text>
        </View>
        <Text style={styles.hours}>{center.hours}</Text>
      </View>
      <View style={[styles.sectionCard, { backgroundColor: '#fdf6e3', borderColor: '#ffe6a1' }] }>
        <View style={styles.row}>
          <Ionicons name="alert-circle-outline" size={20} color="#e6b800" style={{ marginRight: 4 }} />
          <Text style={[styles.sectionTitle, { color: '#e6b800' }]}>Maelezo ya Ziada</Text>
        </View>
        <Text style={{ color: '#444', fontSize: 15, marginTop: 4 }}>
          Unaweza kuweka nafasi yako kwenye foleni sasa. Utaarifiwa dakika 10 kabla ya zamu yako.
        </Text>
      </View>
      <View style={{ marginHorizontal: 24, marginBottom: 32 }}>
        <Text style={styles.joinTitle}>Weka Nafasi Kwenye Foleni</Text>
        <TouchableOpacity style={styles.joinBtn} onPress={handleJoinQueue}>
          <Text style={styles.joinBtnText}>Weka Nafasi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  backBtn: { marginTop: 16, padding: 10 },
  headerImgWrap: { position: 'relative', height: 160, backgroundColor: '#7B2FF2' },
  headerImg: { width: '100%', height: 160, resizeMode: 'cover' },
  backIcon: { position: 'absolute', top: 32, left: 16, backgroundColor: '#7B2FF2aa', borderRadius: 20, padding: 4 },
  headerContent: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8, backgroundColor: '#faf9ff' },
  centerName: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 2, backgroundColor: '#7B2FF2', padding: 8, borderRadius: 8, overflow: 'hidden', marginTop: -32, alignSelf: 'flex-start' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  location: { color: '#666', fontSize: 15 },
  sectionCard: { backgroundColor: '#fff', borderRadius: 14, marginHorizontal: 24, marginBottom: 16, padding: 16, borderWidth: 1, borderColor: '#f2f2f2' },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  statusItem: { flex: 1, alignItems: 'center' },
  statusText: { fontSize: 20, fontWeight: 'bold', color: '#7B2FF2', marginTop: 2 },
  statusLabel: { color: '#666', fontSize: 13, textAlign: 'center' },
  hours: { color: '#444', fontSize: 16, marginTop: 4 },
  joinTitle: { fontSize: 17, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  joinBtn: { backgroundColor: '#7B2FF2', borderRadius: 8, paddingVertical: 16, alignItems: 'center', marginTop: 4 },
  joinBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tokenBox: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: '#f3f0ff', borderRadius: 8, padding: 10 },
  tokenText: { color: '#7B2FF2', fontSize: 16 },
}); 