import React from 'react';
import {View, Text, StyleSheet, Keyboard, TextInput} from 'react-native';
import {withGlobalContext} from '../../context';
import {color} from '../../configs';
import {material} from 'react-native-typography';
export default withGlobalContext(({global}) => {
  const {user} = global;
  //<Text>Сүүлд нэвтэрсэн{user.metadata.lastSignInTime}</Text>
  return (
    <View style={styles.container}>
      <Text style={[material.body1, styles.text, {marginTop: 30}]}>
        Имэйл
        <Text
          style={[
            material.caption,
            {color: user.emailVerified ? 'green' : 'gray'},
          ]}>
          ・{`${user.emailVerified ? 'Баталгаажсан' : 'Баталгаажаагүй'}`}
        </Text>
      </Text>
      <TextInput
        value={user.email || ''}
        editable={false}
        onSubmitEditing={Keyboard.dismiss}
        label="Email"
        placeholder="📧 Имэйл хаяг"
        style={styles.input}
      />

      <Text style={[material.body1, styles.text]}>Нууц үг</Text>
      <TextInput
        value={user.password || ''}
        editable={false}
        onSubmitEditing={Keyboard.dismiss}
        label="Password"
        placeholder="🔑 Нууц үг"
        style={styles.input}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'left',
    width: '100%',
    fontFamily: 'Conforta',
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderRadius: 13,
    fontSize: 14,
    borderWidth: 1,
    borderColor: color.ripple,
    fontFamily: 'Conforta',
    backgroundColor: '#f6f6f6',
    color: color.PRIMARY,
    marginBottom: 10,
  },
});
