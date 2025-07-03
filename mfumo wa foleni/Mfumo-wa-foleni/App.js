import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VituoScreen from './screens/VituoScreen';
import NafasiYanguScreen from './screens/NafasiYanguScreen';
import ArifaScreen from './screens/ArifaScreen';
import MipangilioScreen from './screens/MipangilioScreen';
import ServiceCenterDetailsScreen from './screens/ServiceCenterDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Vituo') {
            iconName = 'business-outline';
          } else if (route.name === 'Nafasi Yangu') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Arifa') {
            iconName = 'notifications-outline';
          } else if (route.name === 'Mipangilio') {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7B2FF2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Vituo" component={VituoScreen} />
      <Tab.Screen name="Nafasi Yangu" component={NafasiYanguScreen} />
      <Tab.Screen name="Arifa" component={ArifaScreen} />
      <Tab.Screen name="Mipangilio" component={MipangilioScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ServiceCenterDetails" component={ServiceCenterDetailsScreen} options={{ title: 'Maelezo ya Kituo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 