import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions 
} from 'react-native';
import Colors from '../../constant/Colors';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function FlashCard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = new Animated.Value(0);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableOpacity onPress={flipCard} style={styles.container}>
      <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
        <View style={[styles.cardFace, styles.cardFront]}>
          <Text style={styles.cardText}>{card.front}</Text>
        </View>
      </Animated.View>
      <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
        <View style={[styles.cardFace, styles.cardBack]}>
          <Text style={styles.cardText}>{card.back}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 200,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  flipCard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  cardFace: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardFront: {
    backgroundColor: Colors.PRIMARY,
  },
  cardBack: {
    backgroundColor: Colors.LIGHT_GREEN,
  },
  cardText: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '600',
  },
}); 