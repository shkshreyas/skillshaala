import React from 'react';
import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="home" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Home'
        }}
      />
      <Tabs.Screen 
        name="explore" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wpexplorer" size={size} color={color} />
          ),
          tabBarLabel: 'Explore'
        }}
      />
      <Tabs.Screen 
        name="progress" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="bars-progress" size={size} color={color} />
          ),
          tabBarLabel: 'Progress'
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          ),
          tabBarLabel: 'Profile'
        }}
      />
    </Tabs>
  );
}
