import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Html5Entities } from 'html-entities';
import { Answer } from './Answer'

const entities = new Html5Entities();

export const Question = ({question, correct_answer, answers, answerQuestion, disabled}: any) => {
  
  return (
    <>
      <Text style={styles.title}>{entities.decode(question)}</Text>
        {answers.map((a: string, i: number) => {
            return <Answer key={a + i} disabled={disabled} answer={a} index={i} correct={a === correct_answer} answerQuestion={answerQuestion}/>
        })}
      </>
  )
}

const styles = StyleSheet.create({
  title: {color: '#888', fontSize: 18, width: '90%', textAlign: 'center'},
})