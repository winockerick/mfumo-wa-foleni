import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7B2FF2',
        tabBarInactiveTintColor: '#bbb',
        tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
        tabBarStyle: { height: 60, paddingBottom: 6 },
      }}
      initialRouteName="vituo"
    >
      <Tabs.Screen
        name="vituo"
        options={{
          title: 'Vituo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="aperture" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nafasi-yangu"
        options={{
          title: 'Nafasi Yangu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="arifa"
        options={{
          title: 'Arifa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mipangilio"
        options={{
          title: 'Mipangilio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 