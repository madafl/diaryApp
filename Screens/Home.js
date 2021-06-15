import React, { Component } from 'react';
import firebase from '../Auth/firebase';
import { SafeAreaView, View, StyleSheet, Text, Iamge, Button, FlatList, ScrollView, Navigator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postari: [],
      email: this.props.email,
      redirect: false,
      
    }
    this.handleTitluChange = this.handleTitluChange.bind(this);
    this.handleDescriereChange = this.handleDescriereChange.bind(this);
  }
  componentDidMount() {
    this.afisare();
  }
  afisare() {
    const dbPostari = firebase.database().ref().child('postari');
    dbPostari.once('value').then(snapshot => {
      const postariDB = [];
      snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        postariDB.push(item);
      });
      this.setState({ postari: postariDB });
    });
  }
  handleTitluChange(e) {
    this.setState({
      titlu: e.nativeEvent.text,
    });
  }
  handleDescriereChange(e) {
    this.setState({
      descriere: e.nativeEvent.text,
    });
  }
  deletePost(e, titlu, data) {
    e.preventDefault();
    const dbPostari = firebase.database().ref().child('postari');
    dbPostari.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        if (item.titlu === titlu && item.data === data) {
          firebase.database().ref('/postari/' + childSnapshot.key).remove();
          alert("Postare stearsa cu succes!");
          this.afisare();
        }
      })
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    this.afisare();
    
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <FlatList data={this.state.postari} keyExtractor={(item) => item.key} renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <Text style={styles.stilTitlu}>{item.titlu} {item.data}</Text>
                <Text style={styles.stilDescriere}>{item.descriere} </Text>
                <View style={styles.buton}>
                  <Button color="#ff291e" title="Sterge" onPress={(e) => this.deletePost(e, item.titlu, item.data)} />
                  {/* <Button color="#34004b" title="Editeaza" onPress={() => navigate('Actualizeaza',  {titlu: 'abc'})} /> */}
                </View>
              </View>
            )
          }} />
          <Button color="#34004b"
            title="Adauga o postare"
            onPress={() => navigate('Adauga')}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  item: {
    backgroundColor: '#F2F2F2',
    width: 350,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  titluPagina: {
    fontSize: 24,
  },
  stilTitlu: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  stilDescriere: {
  },
  stilData: {
  },
  buton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },

});
