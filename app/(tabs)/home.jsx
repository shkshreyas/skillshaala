import React from 'react';
import { View, Text, Platform } from 'react-native';
import Header from '../../components/Home/Header';
import CourseList from '../../components/Home/CourseList';
export default function Home() {
  return (
    <View style={{
      padding:25,
      paddingTop: Platform.OS == 'ios' && 45
    }} >
      <Header/>
      <CourseList />
    </View>
  )
}
