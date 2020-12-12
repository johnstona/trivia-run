import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trivia Run!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Quiz')}
        style={styles.button}>
        <Text style={styles.buttonText}>Start Run!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#a082ed', margin: '5%', padding: '5%', borderRadius: 10, width: '90%', textAlign: 'center' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {fontSize: 20, color: '#fff'},
  title: {color: '#888', fontSize: 18, width: '90%', textAlign: 'center'},
})