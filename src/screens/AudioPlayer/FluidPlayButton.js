import React from 'react';
import {Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue, 
  useDerivedValue
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {D, MAIN} from '../../configs';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedButton = Animated.createAnimatedComponent(Pressable);
export default function FluidPlayButton({playing = false, onPress,...rest}) {
  const touchValue = useSharedValue(0);
  const pressing=useSharedValue(false)
  const isPlaying = useSharedValue(false);
  const scale = useDerivedValue(()=>{
    if(isPlaying.value){
      return withSpring(0.8,MAIN.spring)  
    }
    return withSpring(1,MAIN.spring)
    
  })
  React.useEffect(() => {
    isPlaying.value = playing;
  }, [playing]);
  const buttonStyle = useAnimatedStyle(() => {
    return {
      height: 200,
      width:200,
      zIndex: 2,
      transform: [
        {
          scale: scale.value,
        },
        {translateX: touchValue.value},
      ],
      borderRadius: withSpring(isPlaying.value ? 1 : D.WIDTH / 2, MAIN.spring),
      backgroundColor: '#bada55',
      justifyContent: 'center',
      alignItems: 'center',
    };
  });

  const styleIcon = useAnimatedStyle(() => {
    return {textAlign: 'center'};
  });

  return (
      <AnimatedButton onPress={onPress} style={[buttonStyle]} >
        <AnimatedIcon
          name={playing ? 'md-pause' : 'md-play'}
          style={[styleIcon]}
          size={100}
        />
      </AnimatedButton>)
}
