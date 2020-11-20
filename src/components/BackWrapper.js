import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {D} from '../configs'
export const BackWrapper = ({Y, children}) => {
    const styleContainer = useAnimatedStyle(() => {
      const Value = 350 - Y.value * 2;
      return {
        backgroundColor: '#dbe0e94D',
        minHeight:150,
        borderBottomLeftRadius: withSpring(Value, {damping: 20, stiffness: 90}),
        borderBottomRightRadius: withSpring(Value, {damping: 20, stiffness: 90}),
        transform: [
          {translateY: withSpring(1 - Y.value, {damping: 20, stiffness: 90})},
        ],
      };
    });
    const styleChildren = useAnimatedStyle(() => {
      return {
        marginTop: 100,
        transform: [
          {translateY: withSpring(1 - Y.value * 2, {damping: 20, stiffness: 90})},
        ],
      };
    });
    return (
      <LinearGradient colors={["#03045e","#caf0f8"]} >
      <Animated.View style={[styleContainer]}>
        <Animated.View style={[styleChildren]}>{children}</Animated.View>
      </Animated.View>
    </LinearGradient>
    );
  };