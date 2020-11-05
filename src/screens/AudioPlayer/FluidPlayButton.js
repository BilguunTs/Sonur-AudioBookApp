import React from 'react';
import {Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {D, MAIN} from '../../configs';
import {PanGestureHandler} from 'react-native-gesture-handler';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedButton = Animated.createAnimatedComponent(Pressable);
export default function FluidPlayButton({isPlaying = false, ...rest}) {
  const touchValue = useSharedValue(0);
  const buttonStyle = useAnimatedStyle(() => {
    return {
      height: D.HEIGHT / 4,
      width: D.WIDTH / 2,
      zIndex: 2,
      transform: [
        {
          scale: withSpring(isPlaying ? 0.8 : 1, MAIN.spring),
        },
        {translateX: touchValue.value},
      ],
      borderRadius: D.WIDTH / 2,
      backgroundColor: '#bada55',
      justifyContent: 'center',
      alignItems: 'center',
    };
  });

  const styleIcon = useAnimatedStyle(() => {
    return {textAlign: 'center'};
  });
  const _onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = touchValue.value;
    },
    onActive: (event, ctx) => {
      touchValue.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      touchValue.value = withSpring(0);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={_onPanGestureEvent}>
      <AnimatedButton style={[buttonStyle]} {...rest}>
        <AnimatedIcon
          name={!isPlaying ? 'md-play' : 'md-pause'}
          style={[styleIcon]}
          size={100}
        />
      </AnimatedButton>
    </PanGestureHandler>
  );
}
