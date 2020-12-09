import { StatusBar } from 'expo-status-bar';
import React, { Component }from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import firebase from 'firebase';
import LoginForm from './LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentDidMount() {
    const firebaseConfig = {
      // 各自生成された値を入れる
      apiKey: "AIzaSyALnVk6qkvQnHJQcWS8xy0NWZQE2MtR3XI",
      authDomain: "firstproject-8b512.firebaseapp.com",
      databaseURL: "https://firstproject-8b512.firebaseio.com",
      projectId: "firstproject-8b512",
      storageBucket: "firstproject-8b512.appspot.com",
      messagingSenderId: "642915654759",
      appId: "1:642915654759:web:f61b17ec45543bccee48c2",
      measurementId: "G-6HNB31K0F7"
    }
    if (!firebase.apps.length) { // これをいれないとエラーになったのでいれてます。
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderForm() {
    if (this.state.loggedIn) {
      return(
        <View style={styles.wrap}>
          <Text style={styles.textStyle}>ログイン出来ました</Text>
          <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>ログアウト</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return(<LoginForm />)
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>{this.state.loggedIn ? "ログイン中です" : "ログインして下さい"}</Text>
        </View>
        {this.renderForm()}
      </SafeAreaView>
    )
  }
}

const styles = {
  // スタイルを記述
  wrap: {
    padding: 10
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff'
  }
}

export default App;