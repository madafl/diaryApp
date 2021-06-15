import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import Home from './Screens/Home';
import Adauga from './Screens/Adauga';
import Login from './Auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator(); 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Acasa" component={Home} /> 
          <Stack.Screen name="Adauga" component={Adauga} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buton: {
    height: 35,
  }
});

