import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
  PanResponder,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const flashcardsData = [
  {
    id: 1,
    front: "What is React Native?",
    back: "A framework for building native apps using React"
  },
  {
    id: 2,
    front: "What is JSX?",
    back: "A syntax extension for JavaScript that looks similar to XML/HTML"
  },
  {
    id: 3,
    front: "What is a Component?",
    back: "A reusable piece of UI that can be composed to build complex interfaces"
  }
];

export default function FlashcardsScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const position = new Animated.ValueXY();
  const rotate = position.x.interpolate({
    inputRange: [-width/2, 0, width/2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dx) > width * 0.4) {
        const direction = gesture.dx > 0 ? width : -width;
        Animated.timing(position, {
          toValue: { x: direction, y: gesture.dy },
          duration: 250,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(prevIndex => 
            prevIndex < flashcardsData.length - 1 ? prevIndex + 1 : 0
          );
          position.setValue({ x: 0, y: 0 });
          setIsFlipped(false);
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          tension: 40,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.title}>Flashcards</Text>
      </View>

      <View style={styles.cardContainer}>
        <Animated.View 
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate },
              ]
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.cardContent, isFlipped && styles.cardBack]}
            onPress={flipCard}
          >
            <Text style={styles.cardText}>
              {isFlipped ? 
                flashcardsData[currentIndex].back : 
                flashcardsData[currentIndex].front
              }
            </Text>
            <Text style={styles.flipHint}>Tap to flip</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.progress}>
          {currentIndex + 1} / {flashcardsData.length}
        </Text>
        <Text style={styles.hint}>Swipe card to continue</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width - 40,
    height: width - 40,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    padding: 20,
  },
  cardBack: {
    backgroundColor: Colors.LIGHT_GREEN,
  },
  cardText: {
    fontSize: 24,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '600',
  },
  flipHint: {
    position: 'absolute',
    bottom: 20,
    color: Colors.WHITE,
    opacity: 0.8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  progress: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontWeight: '600',
    marginBottom: 5,
  },
  hint: {
    color: Colors.GRAY,
  },
}); 