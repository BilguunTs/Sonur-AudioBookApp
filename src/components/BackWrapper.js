import React from 'react';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
} from 'react-native-reanimated';
//import LinearGradient from 'react-native-linear-gradient'
import {D, MAIN} from '../configs';
export const BackWrapper = ({Y, children}) => {
  const styleContainer = useAnimatedStyle(() => {
    const borderRadius = withSpring(
      interpolate(
        Y.value,
        [0, D.HEIGHT / 2],
        [D.WIDTH / 2, 0],
        Extrapolate.CLAMP,
      ),
    );
    const translateY = withSpring(
      interpolate(
        Y.value,
        [0, D.HEIGHT / 2],
        [0, 1 - D.HEIGHT / 2],
        Extrapolate.CLAMP,
      ),
      MAIN.spring,
    );
    return {
      //backgroundColor: '#212121',
      backgroundColor: '#70689799',
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      transform: [{translateY}],
    };
  });
  const styleChildren = useAnimatedStyle(() => {
    const translateY = withSpring(
      interpolate(
        Y.value,
        [0, D.HEIGHT / 3],
        [0, 1 - D.HEIGHT],
        Extrapolate.CLAMP,
      ),
      MAIN.spring,
    );
    return {
      marginTop: 100,
      transform: [{translateY}],
    };
  });
  return (
    <Animated.View style={[styleContainer]}>
      <Animated.View style={[styleChildren]}>{children}</Animated.View>
    </Animated.View>
  );
};
