import React from 'react';
import {Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {D, MAIN, color} from '../../configs';

const AnimatedButton = Animated.createAnimatedComponent(Pressable);
export default function FluidPlayButton({playing = false, onPress, ...rest}) {
  const touchValue = useSharedValue(0);
  const isPlaying = useSharedValue(false);
  const scale = useDerivedValue(() => {
    if (isPlaying.value) {
      return withSpring(0.8);
    }
    return withSpring(1);
  });
  React.useEffect(() => {
    isPlaying.value = playing;
  }, [playing]);
  const buttonStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      scale.value,
      [0.8, 1],
      [30, 150],
      Extrapolate.CLAMP,
    );
    return {
      height: 200,
      width: 200,
      zIndex: 2,
      transform: [{scale: scale.value}],
      borderRadius: withSpring(borderRadius, MAIN.spring),
      backgroundColor: color.ripple,
      justifyContent: 'center',
      alignItems: 'center',
    };
  });

  return (
    <AnimatedButton
      android_ripple={{color: color.ripple, borderless: true}}
      onPress={onPress}
      style={[buttonStyle]}>
      <Icon
        color={color.PRIMARY}
        name={playing ? 'md-pause' : 'md-play'}
        style={{textAlign: 'center'}}
        size={100}
      />
    </AnimatedButton>
  );
}
