import React, {Component, useState, useRef} from 'react';
import {
  Text,
  Alert,
  View,
  Pressable,
  StyleSheet,
  Keyboard,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSocialButton,
  FacebookSocialButton,
} from 'react-native-social-buttons';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {color, MAIN} from '../../configs';
import Icon from 'react-native-vector-icons/Feather';
import MainLogo from '../../svg/logowithletter.svg';
import Button from '../../components/Button';

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const SingInForm = ({onSubmit = function () {}, startLoad}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    at: '',
    message: '',
  });
  const [formAt, setFormAt] = useState(0);
  const passRef = useRef();
  const emailRef = useRef();
  const formshift = useDerivedValue(() => {
    return withSpring(formAt, MAIN.spring);
  }, [formAt]);

  const onLogin = () => {
    startLoad();
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((r) => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const isValidEmail = () => emailReg.test(email);
  const handleSumbit = () => {
    if (!isValidEmail || email === '') {
      return setError({at: 0, message: 'Имэйл буруу байна'});
    } else if (isValidEmail && password === '') {
      setFormAt(1);
      return passRef.current.focus();
    }
    onLogin();
    onSubmit();
  };
  const styleEmail = useAnimatedStyle(() => {
    const width = interpolate(
      formshift.value,
      [0, 1],
      [270, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      formshift.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      width,
    };
  });
  const handleBack = () => {
    setFormAt(0);
    emailRef.current.focus();
    setPassword('');
  };
  const stylePass = useAnimatedStyle(() => {
    const width = interpolate(
      formshift.value,
      [0, 1],
      [0, 270],
      Extrapolate.CLAMP,
    );
    return {
      opacity: formshift.value,
      width,
    };
  });
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {formAt === 1 && (
          <Pressable
            android_ripple={{borderless: true}}
            onPress={handleBack.bind(this)}>
            <Icon color="gray" size={25} name="chevron-left" />
          </Pressable>
        )}
        <Text style={{...styles.inputext, fontFamily: 'Conforta'}}>
          {formAt === 0 ? 'Имэйл ээ оруулна уу' : 'Нууц үгээ оруулна уу'}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Animated.View style={styleEmail}>
          <TextInput
            value={email}
            ref={emailRef}
            onChangeText={(e) => setEmail(e)}
            onSubmitEditing={Keyboard.dismiss}
            onEndEditing={handleSumbit.bind(this)}
            label="Email"
            placeholder="📧 Имэйл хаяг"
            style={styles.input}
          />
        </Animated.View>
        <Animated.View style={stylePass}>
          <TextInput
            ref={passRef}
            value={password}
            onChangeText={(password) => setPassword(password)}
            label="Password"
            placeholder="🔑 Нууц үг"
            secureTextEntry={true}
            style={styles.input}
          />
        </Animated.View>
      </View>
      <Button
        title={'Нэвтрэх'}
        style={{width: 270, elevation: 1}}
        onPress={handleSumbit.bind(this)}
      />
    </>
  );
};
export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MainLogo />
        <SingInForm startLoad={this.props.startLoad} />
        <View
          style={{
            borderTopColor: 'lightgray',
            borderTopWidth: 1,
            marginVertical: 15,
            width: 250,
            alignItems: 'center',
          }}></View>
        <GoogleSocialButton
          buttonViewStyle={styles.socialBtn}
          buttonText={'Google-ээр нэвтрэх'}
        />
        <FacebookSocialButton
          buttonText={'Facebook-ээр нэвтрэх'}
          buttonViewStyle={styles.socialBtn}
        />
        <Button
          style={{
            width: 270,
            backgroundColor: 'transparent',
            elevation: 0,
            borderWidth: 1,
            marginTop: 10,
          }}
          title="Бүртгүүлэх"
          white={false}
          onPress={() => this.props.setPage(2)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
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
    color: color.PRIMARY,
    marginBottom: 10,
  },
  socialBtn: {
    width: 270,
    borderRadius: 10,
    elevation: 1,
  },
  inputext: {
    width: 240,
    padding: 10,

    textAlign: 'center',
    borderColor: 'black',
    marginBottom: 5,
  },
});
