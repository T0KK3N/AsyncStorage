import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { AsyncStorage } from '@react-native-community/async-storage';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component {
  setItemStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("saving data error")
    }
  };

  removeItemStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("remove data error")
    }
  };

  getItemStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null){
        return value
      } else {
        console.log("read data error")
      }
    } catch (error) {
      console.log("read data error")
    }
  };

  saveStorage = () => {
    this.setItemStorage("LOGIN", {username: "Daniel", pass: "1234"})
  }

  readStorage = () => {
    this.getItemStorage("LOGIN").then(result => {
      let jsonObject = JSON.parse(result)
      alert("username: " + jsonObject.username + " pass: " + jsonObject.pass)
    })
  }

  removeStorage = () => {
    this.removeItemStorage("LOGIN")
  }

  render() {
    let {container, btnStyle, txtStyle} = styles;
    return (
      <View style={container}>
        <TouchableOpacity style={btnStyle} onPress={this.saveStorage}>
          <Text style={txtStyle}>Save string</Text>
        </TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={this.readStorage}>
          <Text style={txtStyle}>Read string</Text>
        </TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={this.removeStorage}>
          <Text style={txtStyle}>Remove Data</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnStyle: {
    backgroundColor: '#7f7fff',
    justifyContent: 'center',
    height: 50,
    width: 100,
    marginTop: 10,
    alignItems: 'center'
  },
  txtStyle: {
    color: '#fff'
  }

})
