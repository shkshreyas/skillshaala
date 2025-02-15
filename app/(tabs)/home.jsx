import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  Platform, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import Header from '../../components/Home/Header';
import CourseList from '../../components/Home/CourseList';
import { PraticeOption } from '../../constant/Option';
import Colors from '../../constant/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

export default function Home() {
  const scrollY = new Animated.Value(0);
  const { width } = Dimensions.get('window');
  const router = useRouter();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: 'clamp'
  });

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.WHITE
    }}>
      <Animated.View style={{
        height: headerHeight,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 45
      }}>
        <Header />
      </Animated.View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        style={{ flex: 1 }}
      >
        {/* Practice Options Section */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 15 }}>
            Practice & Learn
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {PraticeOption.map((item, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push(item.path);
                }}
                style={{
                  width: width * 0.4,
                  marginRight: 15,
                  backgroundColor: Colors.BG_GRAY,
                  borderRadius: 15,
                  padding: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 150,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                }}
              >
                <Image 
                  source={item.icon} 
                  style={{ width: 50, height: 50, marginBottom: 10 }}
                />
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Continue Learning Section */}
        <View style={{ padding: 20 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15
          }}>
            <Text style={{ fontSize: 22, fontWeight: '600' }}>
              Continue Learning
            </Text>
            <TouchableOpacity>
              <MaterialIcons name="arrow-forward" size={24} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={{
              backgroundColor: Colors.LIGHT_GREEN,
              borderRadius: 15,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Image 
              source={require('../../assets/images/banner1.png')}
              style={{ width: 80, height: 80, borderRadius: 10 }}
            />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 5 }}>
                Python Basics
              </Text>
              <Text style={{ color: Colors.GRAY }}>
                Progress: 60%
              </Text>
              <View style={{
                height: 5,
                backgroundColor: Colors.GREEN,
                width: '60%',
                borderRadius: 5,
                marginTop: 10
              }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Popular Courses */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 15 }}>
            Popular Courses
          </Text>
          <CourseList />
        </View>
      </ScrollView>
    </View>
  );
}
