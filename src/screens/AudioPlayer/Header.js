import React from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {material} from 'react-native-typography';
import Animated from 'react-native-reanimated';
import BackButton from '../../components/BackButton';

export default ({
  isToggled,
  text,
  onLeftAction = function () {},
  onRightAction = function () {},
  hideleft = false,
}) => {
  const handleClear = () => {
    Alert.alert(
      'Хаах',
      'тоглуулагчийг хаах уу?',
      [
        {
          text: 'Үгүй',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Тийм', onPress: () => onRightAction()},
      ],
      {cancelable: false},
    );
  };
  return (
    <Animated.View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        {hideleft === false && (
          <View style={{maxHeight: 40}}>
            <BackButton borderless onPress={onLeftAction} />
          </View>
        )}
      </View>
      <View style={{flex: 3, alignItems: 'center'}}>
        <Text
          numberOfLines={2}
          style={[
            material.headline,
            {fontFamily: 'Conforta', textAlign: 'center'},
          ]}>
          {text || 'Хоосон'}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{maxHeight: 40}}>
          <Pressable
            android_ripple={{borderless: true}}
            onPress={handleClear.bind(this)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                borderRadius: 10,
                borderColor: 'gray',
                height: 30,
                width: 40,
              }}>
              <Icon
                name="x"
                color={'#121212'}
                style={{
                  elevation: 2,
                  opacity: 0.5,
                  textAlign: 'center',
                }}
                size={25}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};
