import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { startJob, randomizeArray } from "./Helpers"
import { Question } from "./Question"

const initialLifelineState = {
  fiftyFifty: false,
  cheat: false,
  pass: false,
}

export const QuizScreen = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState<any>()
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<any>([])
  const [disabled, setDisabled] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [disabledLifelines, setDisabledLifelines] = useState(initialLifelineState)

  useEffect(() => {
    const fetchData = async () => {
      const data = await startJob();
      setQuestions(data);
    } 
   fetchData();
  }, [])

  useEffect(() => {
    if (!questions) return
    if (questions.length === 0) return
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
    setDisabledLifelines(initialLifelineState)
    setTimeout(() => {setQuestions(questions.slice(1))}, 200)
  }

  const handleFiftyFifty = () => {
    setDisabledLifelines({
      ...disabledLifelines,
      fiftyFifty: true,
    })
  }

  const handlePass = () => {
    setTimeout(() => {setQuestions(questions.slice(1))}, 200)
    setDisabled(true)
    setDisabledLifelines({
      ...disabledLifelines,
      pass: true,
    })
  }

  const handleCheat = () => {
    handleCorrect()
    setDisabledLifelines({
      ...disabledLifelines,
      cheat: true,
    })
  }

  return (
    <View style={styles.quizView}>
      <View style={styles.scoreView}>
      <Text style={styles.score}>Current run: {score}</Text>
        <Text style={styles.score}>Best run: {highScore}</Text>
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
      <View style={styles.lifelineView}>
        <TouchableOpacity disabled={disabledLifelines.pass} style={disabledLifelines.pass ? styles.buttonUsed : styles.button} onPress={() => handlePass()}>
          <Text style={styles.buttonText}>
            PASS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={disabledLifelines.cheat} style={disabledLifelines.cheat ? styles.buttonUsed : styles.button} onPress={() => handleCheat()}>
          <Text style={styles.buttonText}>
            CHEAT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={disabledLifelines.fiftyFifty} style={disabledLifelines.fiftyFifty ? styles.buttonUsed : styles.button} onPress={() => handleFiftyFifty()}>
          <Text style={styles.buttonText}>
            50/50
          </Text>
        </TouchableOpacity>
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
    fontSize: 30,
  },
  quizView: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  questionView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  lifelineView: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonText: {
    fontSize: 20, 
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: { 
    backgroundColor: '#45d3be', 
    padding: '5%', 
    borderRadius: 40, 
    width: '30%',
  },
  buttonUsed: {
    backgroundColor: '#535454', 
    padding: '5%', 
    borderRadius: 40, 
    width: '30%',
  }
})