import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Html5Entities } from 'html-entities';

const entities = new Html5Entities();

export const Answer = ({answer, index, correct, answerQuestion, disabled}: any) => {
  const [style, setStyle] = useState(styles.button)
  useEffect(() => {
    setStyle(styles.button)
  }, [answer])
  console.log(answer, correct)
    const handlePress = () => {
      setStyle(correct ? styles.buttonCorrect : styles.buttonIncorrect)
      answerQuestion(correct)
    }

    return <TouchableOpacity
        disabled={disabled}
        onPress={() => handlePress()}
        style={style}>
        <Text style={styles.buttonText}>{entities.decode(answer)}</Text>
      </TouchableOpacity>
}

const styles = StyleSheet.create({
  buttonText: {fontSize: 20, color: '#fff'},
  button: { backgroundColor: '#a082ed', margin: '5%', padding: '5%', borderRadius: 10, width: '90%', textAlign: 'center' },
  buttonCorrect: { backgroundColor: 'green', margin: '5%', padding: '5%', borderRadius: 10, width: '90%', textAlign: 'center' },
  buttonIncorrect: { backgroundColor: 'red', margin: '5%', padding: '5%', borderRadius: 10, width: '90%', textAlign: 'center' },
})