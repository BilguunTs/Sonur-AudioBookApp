import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, BackHandler} from 'react-native';
import Animated, {
  useDerivedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {D, color, MAIN} from '../../configs';
import BackgroundSvg from '../../svg/loginbackground.svg';
import {material} from 'react-native-typography';
import SignIn from './SignIn';
import SignUp from './SingUp';
export default () => {
  const [page, setPage] = useState(0);
  const progress = useDerivedValue(() => {
    return withSpring(page, MAIN.spring);
  }, [page]);
  const handleSwitch = (val) => {
    setPage(val);
  };
  const handleBackButtonClick = () => {
    if (page === 0) return BackHandler.exitApp();
    setPage(0);
    return true;
  };
  const stylePathChoice = useAnimatedStyle(() => {
    const height = interpolate(
      progress.value,
      [0, 1, 2],
      [D.HEIGHT, 0, 0],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      progress.value,
      [0, 1, 2],
      [0, -D.HEIGHT, -D.HEIGHT],
      Extrapolate.CLAMP,
    );

    return {
      height,
      transform: [{translateY}],
      opacity:
        progress.value === 0
          ? withSpring(1, MAIN.spring)
          : withSpring(0, MAIN.spring),
    };
  });
  const styleSignIn = useAnimatedStyle(() => {
    const height = interpolate(
      progress.value,
      [0, 1, 2],
      [0, D.HEIGHT, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity:
        progress.value === 1
          ? withSpring(1, MAIN.spring)
          : withSpring(0, MAIN.spring),

      height,
      // transform: [{translateY}],
    };
  });
  const styleSignUp = useAnimatedStyle(() => {
    const height = interpolate(
      progress.value,
      [0, 1, 2],
      [0, 0, D.HEIGHT],
      Extrapolate.CLAMP,
    );
    return {
      height,
      opacity:
        progress.value === 2
          ? withSpring(1, MAIN.spring)
          : withSpring(0, MAIN.spring),
    };
  });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [page]);
  return (
    <View style={{flex: 1, backgroundColor: '#F5EDE2'}}>
      <Animated.View style={stylePathChoice}>
        <BackgroundSvg height={D.HEIGHT} weight={D.WIDTH} />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: D.HEIGHT,
            width: '100%',
          }}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 2}}></View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Pressable
              android_ripple={{color: 'lightgray'}}
              onPress={handleSwitch.bind(this, 1)}
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
              onPress={handleSwitch.bind(this, 2)}
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
      </Animated.View>
      <Animated.View style={styleSignIn}>
        <SignIn setPage={setPage} />
      </Animated.View>

      <Animated.View style={styleSignUp}>
        <SignUp setPage={setPage} />
      </Animated.View>
    </View>
  );
};
