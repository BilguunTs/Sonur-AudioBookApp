import React from 'react';
import {Pressable, Text} from 'react-native';
import {material} from 'react-native-typography';
import {color} from '../configs';
const Button = ({title = '', onPress, style = {}, white = true}) => {
  return (
    <Pressable
      android_ripple={{color: 'lightgray'}}
      onPress={onPress}
      style={{
        padding: 10,
        elevation: 5,
        width: 220,
        borderRadius: 10,
        backgroundColor: color.PRIMARY,
        ...style,
      }}>
      <Text
        style={[
          white ? material.buttonWhite : material.button,
          {textAlign: 'center'},
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};
export default Button;
