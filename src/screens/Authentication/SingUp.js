import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import OuthBtns from './OAuth';
import Toast from 'react-native-toast-message';
//import {material} from 'react-native-typography';
import {color} from '../../configs';
import MainLogo from '../../svg/logowithletter.svg';
import Button from '../../components/Button';

export default class SignIn extends Component {
  state = {
    username: '',
    password: '',
    repass: '',
  };
  go = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      alert('valid');
    } else {
      alert();
    }
  };
  onSignUp = async () => {
    const {username, password, repass} = this.state;
    if (username === '' || password === '' || repass === '') {
      return Toast.show({
        type: 'error',
        text1: '😯 Уучлаарай',
        text2: 'хоосон өгөгдөл байна',
      });
    }
    if (password !== repass) {
      return Toast.show({
        type: 'error',
        text1: '😯 Уучлаарай',
        text2: 'Та нууц үгээ буруу давтсан байна',
      });
    }
    try {
      this.props.startLoad();
      const result = await auth().createUserWithEmailAndPassword(
        username,
        password,
      );
      if (result.user !== undefined) {
        await firestore()
          .collection('Users')
          .doc(result.user.uid)
          .set({purchased: []});
      }
      //firestore().collection("Users").add()
    } catch (e) {
      this.AlertError(e);
      console.log(e.code);
    }
  };
  AlertError(error) {
    this.props.startLoad(false);
    switch (error.code) {
      case 'auth/email-already-in-use':
        Toast.show({
          type: 'error',
          text1: 'Тийм бүртгэлтэй хэрэглэгч байна 😯',
          text2: 'Уучлаарай та өөр Имэйл оруулна уу !',
        });
        break;
      case 'auth/invalid-email':
        Toast.show({
          type: 'error',
          text1: 'Таны оруулсан имэйл буруу байна 😯',
          text2: 'Уучлаарай та Имэйл-ээ шалгаад оруулна уу',
        });
        break;
      case 'auth/unknown':
        Toast.show({
          type: 'error',
          text1: '😯 Холболтын алдаа',
          text2: 'Уучлаарай таны Wifi унтарсан байна',
        });
        break;
      case 'auth/weak-password':
        Toast.show({
          type: 'error',
          text1: '😯 Богино нууц үг',
          text2: 'Уучлаарай таны нууц үг хэт богино байна',
        });
        break;
      default:
        Toast.show({
          type: 'error',
          text1: '😯',
          text2: 'Уучлаарай ямар нэгэн алдаа гарлаа',
        });
    }
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <MainLogo />
        <Text style={{...styles.inputext, fontFamily: 'Conforta'}}>
          Бүртгэлийн хэсэг
        </Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          label="Email"
          placeholder="📧 Имэйл хаяг"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          label="Password"
          placeholder="🔑 Нууц үг"
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.repass}
          onChangeText={(repass) => this.setState({repass})}
          label="Password"
          placeholder="🔑 Нууц үг давтах"
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Батлах'}
          style={{width: 270, elevation: 1}}
          onPress={this.onSignUp.bind(this)}
        />
        <View
          style={{
            borderTopColor: 'lightgray',
            borderTopWidth: 1,
            marginVertical: 10,
            width: 250,
            alignItems: 'center',
          }}></View>
        <View style={{marginBottom: 30, alignItems: 'center'}}>
          <OuthBtns />
          <Button
            style={{
              width: 270,
              backgroundColor: 'transparent',
              elevation: 0,
              marginTop: 10,
              borderWidth: 1,
            }}
            title="Имэйл-ээр нэвтрэх"
            white={false}
            onPress={() => this.props.setPage(1)}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 270,
    height: 50,
    padding: 10,
    borderRadius: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: color.ripple,
    fontFamily: 'Conforta',
    backgroundColor: '#f6f6f6',
    marginBottom: 10,
  },
  inputext: {
    width: 270,
    padding: 10,
    textAlign: 'center',
    borderColor: 'black',
    marginBottom: 3,
  },
});
