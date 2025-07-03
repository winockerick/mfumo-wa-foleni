import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialNotifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Uko karibu kuhudumiwa',
    message: 'Zamu yako itafika baada ya dakika 10 katika Hospitali ya Muhimbili',
    date: '15 Septemba 2023 09:25',
    unread: true,
  },
  {
    id: 2,
    type: 'info',
    title: 'Umewekwa kwenye foleni',
    message: 'Umewekwa kwenye foleni ya TTCL Makao Makuu. Namba yako ni 23.',
    date: '14 Septemba 2023 13:10',
    unread: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'Huduma imekamilika',
    message: 'Huduma yako katika Benki ya NMB imekamilika. Asante kwa kutumia huduma zetu.',
    date: '12 Septemba 2023 10:45',
    unread: false,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Uko karibu kuhudumiwa',
    message: 'Zamu yako itafika baada ya dakika 5 katika Ofisi ya Uhamiaji',
    date: '10 Septemba 2023 15:30',
    unread: false,
  },
];

const iconMap = {
  warning: { name: 'alert-circle-outline', color: '#e6b800', bg: '#fdf6e3' },
  info: { name: 'calendar-outline', color: '#7B2FF2', bg: '#f3f0ff' },
  success: { name: 'checkmark-circle-outline', color: '#2ecc71', bg: '#eafaf1' },
};

export default function ArifaScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#faf9ff' }}>
      <View style={styles.headerRow}>
        <Ionicons name="notifications-outline" size={26} color="#7B2FF2" style={{ marginRight: 8 }} />
        <Text style={styles.header}>Arifa</Text>
        <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 16 }} onPress={markAllRead}>
          <Text style={styles.markAll}>Soma Zote</Text>
        </TouchableOpacity>
      </View>
      {notifications.map(n => {
        const icon = iconMap[n.type];
        return (
          <View
            key={n.id}
            style={[styles.card, { backgroundColor: icon.bg, borderLeftColor: icon.color, borderLeftWidth: n.unread ? 4 : 0 }]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name={icon.name} size={22} color={icon.color} style={{ marginRight: 8 }} />
              <Text style={[styles.title, n.type === 'success' && { color: '#2ecc71' }, n.type === 'warning' && { color: '#e6b800' }]}>
                {n.title}{n.unread && <Text style={styles.dot}>•</Text>}
              </Text>
            </View>
            <Text style={styles.message}>{n.message}</Text>
            <Text style={styles.date}>{n.date}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 8, marginLeft: 16 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  markAll: { color: '#7B2FF2', fontWeight: 'bold', fontSize: 15 },
  card: { borderRadius: 14, marginHorizontal: 16, marginBottom: 16, padding: 16, borderLeftWidth: 0 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 2 },
  dot: { color: '#7B2FF2', fontSize: 18, marginLeft: 2 },
  message: { color: '#444', fontSize: 15, marginBottom: 6 },
  date: { color: '#888', fontSize: 13 },
}); 