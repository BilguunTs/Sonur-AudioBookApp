import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {D, color} from '../configs';
import BackgroundSvg from '../svg/loginbackground.svg';
import {material} from 'react-native-typography';
export default () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F5EDE2'}}>
      <BackgroundSvg height={D.HEIGHT} weight={D.WIDTH} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: D.HEIGHT,
          borderWidth: 1,
          width: '100%',
        }}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 2}}></View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Pressable
            android_ripple={{color: 'lightgray'}}
            style={{
              padding: 15,
              zIndex: 10,
              elevation: 8,
              width: 220,
              borderRadius: 15,
              backgroundColor: color.PRIMARY,
            }}>
            <Text style={[material.buttonWhite, {textAlign: 'center'}]}>
              Нэвтрэх
            </Text>
          </Pressable>
          <Pressable
            android_ripple={{color: '#eee'}}
            style={{
              padding: 10,
              zIndex: 10,
              width: 220,
              marginTop: 5,
              borderRadius: 15,
            }}>
            <Text style={[material.button, {textAlign: 'center'}]}>
              Бүртгүүлэх
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
