import React, {Component} from 'react';
import {
  Text,
  Alert,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  GoogleSocialButton,
  FacebookSocialButton,
} from 'react-native-social-buttons';
import {material} from 'react-native-typography';
import {color} from '../../configs';
import MainLogo from '../../svg/logowithletter.svg';
import Button from '../../components/Button';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  go = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      alert('valid');
    } else {
      alert();
    }
  };

  onLogin() {
    const {username, password} = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
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
          placeholder="Имэйл хаяг"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          label="Password"
          placeholder="Нууц үг"
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          label="Password"
          placeholder="Нууц үг давтах"
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Батлах'}
          style={{width: 270}}
          onPress={this.onLogin.bind(this)}
        />
        <View
          style={{
            borderTopColor: 'lightgray',
            borderTopWidth: 1,
            marginVertical: 30,
            width: 250,
            alignItems: 'center',
          }}></View>
        <View style={{marginBottom: 30, alignItems: 'center'}}>
          <Button
            style={{
              width: 270,
              backgroundColor: 'transparent',
              elevation: 0,
              borderWidth: 1,
            }}
            title="Имэйл ээр нэвтрэх"
            white={false}
            onPress={() => this.props.setPage(1)}
          />
          <GoogleSocialButton
            buttonViewStyle={styles.socialBtn}
            buttonText={'Google ээр нэвтрэх'}
          />
          <FacebookSocialButton
            buttonText={'Facebook ээр нэвтрэх'}
            buttonViewStyle={styles.socialBtn}
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
    borderColor: color.PRIMARY,
    fontFamily: 'Conforta',
    backgroundColor: '#f6f6f6',
    marginBottom: 10,
  },
  socialBtn: {
    width: 270,
    borderRadius: 10,
    elevation: 3,
  },
  inputext: {
    width: 270,
    padding: 10,
    textAlign: 'center',
    borderColor: 'black',
    marginBottom: 3,
  },
});
