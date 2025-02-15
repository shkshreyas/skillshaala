import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  StyleSheet,
  Animated 
} from 'react-native';
import Colors from '../../constant/Colors';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

export default function QuizCard({ quiz, index }) {
  const router = useRouter();
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      tension: 10,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [
          { scale: animatedValue },
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      },
    ]}>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.push(`/practice/quiz/${quiz.id}`);
        }}
      >
        <Image 
          source={require('../../assets/images/quiz.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>{quiz.title}</Text>
        <Text style={styles.subtitle}>{quiz.questions.length} Questions</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{quiz.difficulty}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{quiz.timeLimit}min</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: Colors.GRAY,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.GRAY,
  },
}); 