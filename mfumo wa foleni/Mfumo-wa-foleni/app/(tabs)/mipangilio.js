import { View, Text, StyleSheet, Switch } from 'react-native';
import React, { useState } from 'react';

export default function MipangilioScreen() {
  const [appNotif, setAppNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mipangilio</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Taarifa za Arifa</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Arifa za App</Text>
          <Switch value={appNotif} onValueChange={setAppNotif} trackColor={{ true: '#7B2FF2' }} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Arifa za SMS</Text>
          <Switch value={smsNotif} onValueChange={setSmsNotif} trackColor={{ true: '#7B2FF2' }} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historia na Vipendelo</Text>
        <Text style={styles.link}>Historia ya Nafasi {'>'}</Text>
        <Text style={styles.link}>Vituo Pendwa {'>'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9ff', padding: 24 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#7B2FF2', marginBottom: 24 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  label: { fontSize: 16, color: '#333' },
  link: { color: '#7B2FF2', fontSize: 16, marginTop: 8 },
}); 