import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { startJob, randomizeArray } from "./Helpers"
import { Question } from "./Question"

export const QuizScreen = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState<any>()
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<any>([])
  const [disabled, setDisabled] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const data = await startJob();
      setQuestions(data);
    } 
   fetchData();
  }, [])

  useEffect(() => {
    if (questions[0] !== currentQuestion) {
    setCurrentQuestion(questions[0])
    }
    if (questions.length < 5) {
      const fetchData = async () => {
        const data = await startJob();
        const qs = questions.concat(data)
        setQuestions(qs);
      } 
     fetchData();
    }
  }, [questions])

  useEffect(() => {
    if (currentQuestion) {
      const { correct_answer, incorrect_answers} = currentQuestion
      const answers = incorrect_answers.concat(correct_answer)
      const randomizedAnswers = randomizeArray(answers)
      setAnswers(randomizedAnswers)
    }
    setDisabled(false)
  }, [currentQuestion])

  const answerQuestion = (outcome: boolean) => {
    if (outcome) {
      handleCorrect()
    } else {
      handleIncorrect()
    }
  }

  const handleCorrect = () => {
    setScore(score + 1)
    setTimeout(() => {setQuestions(questions.slice(1))}, 200)
    setDisabled(true)
    console.log(score)
  }

  const handleIncorrect = () => {
    setDisabled(true)
    setModalVisible(true)
    if (score > highScore) {
      setHighScore(score)
    }
    setScore(0)
    setTimeout(() => {setQuestions(questions.slice(1))}, 200)
  }

  return (
    <View style={styles.quizView}>
      <View style={styles.scoreView}>
        <Text style={styles.score}>Current best run: {highScore}</Text>
      </View>
      <View style={styles.questionView}>
        {currentQuestion && 
        <Question disabled={disabled} 
          answers={answers} 
          question={currentQuestion.question} 
          correct_answer={currentQuestion.correct_answer} 
          answerQuestion={answerQuestion} 
          />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreView: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  score: {
    fontSize: 18,
  },
  quizView: {
    flex: 1,
  },
  questionView: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
})