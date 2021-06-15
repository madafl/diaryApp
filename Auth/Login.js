import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    TextInput, Button, View, Image, TouchableHighlight
} from 'react-native';
import firebase from '../Auth/firebase';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            loggedInEmail: '',
            create: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((e) => {
            alert( "Email sau parola gresite!");
        }).finally(alert("Succes!"));
        this.setState({ loggedIn: true });
        this.props.navigation.navigate('Acasa', );
    }
    signup = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((e) => {
            alert("Eroare la crearea contului!");
        }).finally(alert("Cont creat cu succes!"));
    }
    handleEmailChange(e) {
        this.setState({
            email: e.nativeEvent.text,
        });
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.nativeEvent.text,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <>
                    <View style={styles.div}>
                       { this.state.create ? ( <Text style={styles.title}>SignUp</Text> ) : (<Text style={styles.title}>Login</Text> ) }
                        <TextInput placeholder="Email" onChange={this.handleEmailChange} value={this.state.email} style={styles.textInput} />
                        <TextInput placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} style={styles.textInput} secureTextEntry={true} />
                    </View>
                    {
                        this.state.create ? (
                            <>
                                <Button color="#34004b" title="Signup" onPress={this.signup} />
                                <Text onPress={() => this.setState({ create: false })}>Login</Text>
                            </>
                        ) : (
                            <>
                                <Button color="#34004b" title="Login" onPress={this.login} />
                                <Text onPress={() => this.setState({ create: true })}>Creeaza un cont</Text>
                            </>
                        )}
                </>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        borderColor: '#F2F2F2',
        padding: 6,
        borderRadius: 4,
        marginTop: 4,
        width: 300,
    },
    title: {
        fontSize: 24
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
    },
    div: {
        marginBottom: 10,
    }
});