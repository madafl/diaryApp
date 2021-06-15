import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from './firebase';

export default function Logout() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
       logoutFct = () => {
        firebase.auth().signOut().catch((e) => {
          alert("You not logged in");
        }).finally(alert("Logged out"));
      }
    } else {
      alert("You not logged in");
    }
  });

  return (
    <View style={styles.container}>
      <Button color="#34004b" title="Logout" onPress={() => logoutFct()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#34004b',
    padding: 2,
    borderRadius: 4,
    marginTop: 12
  },
  text: {
    color: '#fff',
    padding: 6
  }
});
