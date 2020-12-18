import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';
import {color} from '../configs';
export default ProgressView = ({stop = false}) => {
  if (stop) return <></>;
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          size="small"
          color={color.PRIMARY}
          style={{marginRight: 5}}
        />
        <Text style={{textAlign: 'center', fontFamily: 'Conforta'}}>
          татаж байна
        </Text>
      </View>
      <LottieView
        resizeMode="cover"
        autoPlay
        loop
        source={require('../animation/waitinpegeon.json')}
        onAnimationFinish={() => console.log('finished')}
        style={{height: '100%', width: '100%'}}
      />
    </>
  );
};
