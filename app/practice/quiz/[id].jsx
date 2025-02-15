import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  Image,
  SafeAreaView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../../constant/Colors';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

const quizData = {
  1: {
    title: "Python Basics",
    questions: [
      {
        id: 1,
        question: "What is Python?",
        options: [
          "A programming language",
          "A snake",
          "A game engine",
          "A web browser"
        ],
        correct: 0
      },
      {
        id: 2,
        question: "Which of these is a valid Python variable name?",
        options: [
          "1variable",
          "_variable",
          "variable@",
          "class"
        ],
        correct: 1
      }
    ]
  },
  2: {
    title: "JavaScript Fundamentals",
    questions: [
      {
        id: 1,
        question: "What is JavaScript?",
        options: [
          "A coffee brand",
          "A programming language",
          "A text editor",
          "An operating system"
        ],
        correct: 1
      }
    ]
  }
};

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestion]);

  const handleAnswer = (index) => {
    setSelectedOption(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const isCorrect = index === quizData[id].questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizData[id].questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        fadeAnim.setValue(0);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Image 
            source={require('../../../assets/images/trophy.png')}
            style={styles.trophyImage}
          />
          <Text style={styles.resultTitle}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            Score: {score}/{quizData[id].questions.length}
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Back to Quizzes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.title}>{quizData[id].title}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progress, 
              { 
                width: `${((currentQuestion + 1) / quizData[id].questions.length) * 100}%` 
              }
            ]} 
          />
        </View>
        <Text style={styles.questionCount}>
          {currentQuestion + 1}/{quizData[id].questions.length}
        </Text>
      </View>

      <Animated.View 
        style={[
          styles.questionContainer,
          { opacity: fadeAnim }
        ]}
      >
        <Text style={styles.question}>
          {quizData[id].questions[currentQuestion].question}
        </Text>

        {quizData[id].questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === index && 
                (index === quizData[id].questions[currentQuestion].correct ? 
                  styles.correctOption : styles.wrongOption)
            ]}
            onPress={() => handleAnswer(index)}
            disabled={selectedOption !== null}
          >
            <Text style={[
              styles.optionText,
              selectedOption === index && 
                (index === quizData[id].questions[currentQuestion].correct ? 
                  styles.correctOptionText : styles.wrongOptionText)
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
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
  progressContainer: {
    padding: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 4,
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
  },
  questionCount: {
    marginTop: 10,
    color: Colors.GRAY,
  },
  questionContainer: {
    padding: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
  },
  optionButton: {
    padding: 20,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionText: {
    fontSize: 16,
  },
  correctOption: {
    backgroundColor: Colors.LIGHT_GREEN,
    borderColor: Colors.GREEN,
  },
  wrongOption: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FF4444',
  },
  correctOptionText: {
    color: Colors.GREEN,
    fontWeight: 'bold',
  },
  wrongOptionText: {
    color: '#FF4444',
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  trophyImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 24,
    color: Colors.PRIMARY,
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
}); 