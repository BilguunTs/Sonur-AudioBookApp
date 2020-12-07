import React from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {MAIN, D, color} from '../../configs';
const ACTION_BTN_SIZE = MAIN.CIRCLE_SIZE * 0.7;
const ActionButton = ({
  onPress = function () {},
  direction = 'left',
  text = '',
}) => {
  return (
    <View style={{justifyContent: 'center'}}>
      <Pressable
        onPress={onPress.bind(this)}
        android_ripple={{color: color.ripple, borderless: true}}
        style={[style.button]}>
        <Icon
          name={direction === 'left' ? 'replay-10' : 'forward-10'}
          size={30}
          style={{width: 30, height: 30, opacity: 0.5}}
        />
        {text !== '' && (
          <Text numberOfLines={1} style={[styleText]}>
            {text}
          </Text>
        )}
      </Pressable>
    </View>
  );
};
const style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ACTION_BTN_SIZE,
    width: ACTION_BTN_SIZE,
    borderRadius: ACTION_BTN_SIZE,
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 1,
    color: '#333',
    fontSize: 12,
  },
});
export default ActionButton;
