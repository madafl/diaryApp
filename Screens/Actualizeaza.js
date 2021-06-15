import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    TextInput, Button, View, Image,  TouchableHighlight
  } from 'react-native';
import DatePicker from 'react-native-datepicker'

export default class Adauga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titlu: this.props.titlu,
            descriere: this.props.descriere,
            data: this.props.data,
            stare: this.props.stare,
        }
        
    }
    handleSubmit(e) {
        e.preventDefault();
        // if (this.state.titlu != '' && this.state.data != ''){
        const dbPost = firebase.database().ref().child('postari');
        var post = dbPost.push();
        post.set({
          titlu: this.state.titlu,
          descriere: this.state.descriere,
          data: this.state.data,
          stare: this.state.stare
        });
        alert("Adaugat cu succes!");
        this.props.navigation.navigate('Acasa');
        // } else {
        //   alert('Completeaza titlul si data!')
        // }
      }
    clearInputsCheck = () => {
        this.setState({
          titlu: '',
          descriere: '',
          data: '',
          stare: '',
        })
      }
    render() {
     
    
     alert(this.state.titlu);
        return (
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Ce ai facut astazi?</Text>
                <TextInput placeholder="Titlu"
                    style={styles.textInput}
                    multiline={true}
                    onChange={this.handleTitluChange} value={this.state.titlu} />
                <TextInput placeholder="Descriere"
                    style={styles.textInput}
                    numberOfLines={10}
                    multiline={true}
                    onChange={this.handleDescriereChange} value={this.state.descriere} />

                <DatePicker
                    style={styles.data}
                    date={this.state.data}
                    mode="date"
                    placeholder="Alege o data"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        },
                    }}
                    onDateChange={(data) => { this.setState({ data: data }) }}
                />
                <Text>Cum te-ai simtit astazi?</Text>
                <View style={styles.fixToText}>
                    <View>
                        <TouchableHighlight onPress={() => { this.setState({ stare: 'ingrozitor' }) }}>
                            <Image
                                style={[this.state.stare == 'ingrozitor' ? styles.stareSelectata : styles.tinyLogo]}
                                source={require('../assets/ingrozitor.png')} />
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => { this.setState({ stare: 'trist' }) }}>
                            <Image
                                style={[this.state.stare == 'trist' ? styles.stareSelectata : styles.tinyLogo]}
                                source={require('../assets/trist.png')} />
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => { this.setState({ stare: 'neutru' }) }}>
                            <Image
                                style={[this.state.stare == 'neutru' ? styles.stareSelectata : styles.tinyLogo]}
                                source={require('../assets/neutru.png')} />
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => { this.setState({ stare: 'bucuros' }) }}>
                            <Image
                                style={[this.state.stare == 'bucuros' ? styles.stareSelectata : styles.tinyLogo]}
                                source={require('../assets/bucuros.png')} />
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => { this.setState({ stare: 'fericit' }) }}>
                            <Image
                                style={this.state.stare == 'fericit' ? styles.stareSelectata : styles.tinyLogo}
                                source={require('../assets/fericit.png')} />
                        </TouchableHighlight>
                    </View>
                </View>
                {/* <ImagePickerExample/> */}
                <View style={styles.fixToText}>
                    <Button color="#ff291e" title="Sterge" onPress={this.clearInputsCheck} />
                    <Button color="#34004b" title="Actualizeaza" onPress={this.handleSubmit} />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2a8ab7'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: '#F2F2F2',
        borderColor: '#F2F2F2',
        padding: 6,
        borderRadius: 4,
        marginTop: 4,
        width: 300,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
    },
    scrollView: {
        marginTop: 40,
        marginHorizontal: 20,
    },
    data: {
        marginBottom: 10,
        width: 300,
        backgroundColor: '#F2F2F2',
        borderRadius: 4,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10,
    },
    tinyLogo: {
        width: 60,
        height: 60,
    },
    stareSelectata: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#34004b'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
