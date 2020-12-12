import { StyleSheet } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {color: '#888', fontSize: 18, width: vw(90), textAlign: 'center'},
  button: { backgroundColor: '#a082ed', margin: '5%', padding: '5%', borderRadius: 10, width: vw(90), textAlign: 'center' },
  buttonCorrect: { backgroundColor: 'green', margin: '5%', padding: '5%', borderRadius: 10, width: vw(90), textAlign: 'center' },
  buttonIncorrect: { backgroundColor: 'red', margin: '5%', padding: '5%', borderRadius: 10, width: vw(90), textAlign: 'center' },
  buttonText: {fontSize: 20, color: '#fff'},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
