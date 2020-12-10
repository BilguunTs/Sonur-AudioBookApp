import React from 'react';
import {View, Text} from 'react-native';
import {material} from 'react-native-typography';
import Animated from 'react-native-reanimated';
import BackButton from '../../components/BackButton';

export default ({isToggled, text, leftAction, hideleft = false}) => {
  return (
    <Animated.View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        {hideleft === false && (
          <View style={{maxHeight: 40}}>
            <BackButton borderless onPress={leftAction} />
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
      <View style={{flex: 1}} />
    </Animated.View>
  );
};
