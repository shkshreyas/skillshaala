import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';

const qaData = [
  {
    id: 1,
    question: "What is the difference between let and const in JavaScript?",
    answer: "let allows reassignment of values while const creates a read-only reference to a value. Neither let nor const are hoisted and both have block scope."
  },
  {
    id: 2,
    question: "Explain React Native's Virtual DOM",
    answer: "React Native uses a virtual DOM to improve performance by minimizing direct manipulation of the native UI elements. It creates a lightweight copy of the actual DOM and uses it for calculations before updating the real DOM."
  },
  {
    id: 3,
    question: "What are React Native Hooks?",
    answer: "Hooks are functions that allow you to 'hook into' React state and lifecycle features from function components. Common hooks include useState, useEffect, useContext, etc."
  }
];

export default function QAScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [animations] = useState(() => 
    qaData.reduce((acc, item) => ({
      ...acc,
      [item.id]: new Animated.Value(0)
    }), {})
  );

  const toggleAnswer = (id) => {
    if (expandedId === id) {
      Animated.timing(animations[id], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedId(null));
    } else {
      if (expandedId) {
        Animated.timing(animations[expandedId], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      setExpandedId(id);
      Animated.timing(animations[id], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const filteredQA = qaData.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.title}>Q&A</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.GRAY} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search questions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {filteredQA.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.qaCard}
            onPress={() => toggleAnswer(item.id)}
          >
            <View style={styles.questionRow}>
              <Text style={styles.question}>{item.question}</Text>
              <Animated.View style={{
                transform: [{
                  rotate: animations[item.id].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg']
                  })
                }]
              }}>
                <Ionicons 
                  name="chevron-down" 
                  size={24} 
                  color={Colors.PRIMARY} 
                />
              </Animated.View>
            </View>
            
            <Animated.View style={{
              maxHeight: animations[item.id].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000]
              }),
              opacity: animations[item.id],
              overflow: 'hidden'
            }}>
              <Text style={styles.answer}>{item.answer}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  qaCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  answer: {
    marginTop: 15,
    fontSize: 14,
    color: Colors.GRAY,
    lineHeight: 22,
  },
}); 