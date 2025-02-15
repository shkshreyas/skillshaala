import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  SafeAreaView 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import QuizCard from '../../components/Practice/QuizCard';
import FlashCard from '../../components/Practice/FlashCard';
import Colors from '../../constant/Colors';
import { PraticeOption } from '../../constant/Option';

export default function PracticeScreen() {
  const { type } = useLocalSearchParams();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // In a real app, this would fetch from an API
    if (type === 'quiz') {
      setData([
        {
          id: 1,
          title: 'Python Basics',
          difficulty: 'Beginner',
          timeLimit: 15,
          questions: Array(10).fill({})
        },
        {
          id: 2,
          title: 'JavaScript Fundamentals',
          difficulty: 'Intermediate',
          timeLimit: 20,
          questions: Array(15).fill({})
        },
      ]);
    } else if (type === 'flashcards') {
      setData([
        {
          id: 1,
          front: 'What is React Native?',
          back: 'A framework for building native apps using React'
        },
        {
          id: 2,
          front: 'What is JSX?',
          back: 'A syntax extension for JavaScript that looks similar to XML/HTML'
        },
      ]);
    }
  }, [type]);

  const renderItem = ({ item, index }) => {
    if (type === 'quiz') {
      return <QuizCard quiz={item} index={index} />;
    } else if (type === 'flashcards') {
      return <FlashCard card={item} />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {type === 'quiz' ? 'Quizzes' : 'Flashcards'}
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
  },
  listContainer: {
    padding: 10,
  },
}); 