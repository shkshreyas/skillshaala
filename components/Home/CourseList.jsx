import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  FlatList,
  Dimensions 
} from 'react-native';
import Colors from '../../constant/Colors';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const courses = [
  {
    id: 1,
    title: 'Web Development',
    instructor: 'John Doe',
    image: require('../../assets/images/banner2.png'),
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Mobile App Development',
    instructor: 'Jane Smith',
    image: require('../../assets/images/banner3.png'),
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'UI/UX Design',
    instructor: 'Mike Johnson',
    image: require('../../assets/images/banner4.png'),
    level: 'Advanced'
  }
];

export default function CourseList() {
  const renderCourseCard = ({ item }) => (
    <TouchableOpacity 
      style={{
        width: width * 0.7,
        marginRight: 20,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        overflow: 'hidden'
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    >
      <Image 
        source={item.image}
        style={{
          width: '100%',
          height: 150
        }}
        resizeMode="cover"
      />
      <View style={{ padding: 15 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ 
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 5
          }}>
            {item.title}
          </Text>
          <View style={{
            backgroundColor: Colors.PRIMARY,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5
          }}>
            <Text style={{ color: Colors.WHITE, fontSize: 12 }}>
              {item.level}
            </Text>
          </View>
        </View>
        <Text style={{ color: Colors.GRAY }}>
          By {item.instructor}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={courses}
      renderItem={renderCourseCard}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
