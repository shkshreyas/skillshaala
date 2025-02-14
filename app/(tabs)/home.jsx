import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function Home() {
  return (
    <View style={{
      padding:25,
      paddingTop: Platform.OS == 'ios' && 45
    }} >
      <Header />
    </View>
  )
}
