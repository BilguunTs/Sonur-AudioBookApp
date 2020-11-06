import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Animated, {
  measure,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedRef,
  useDerivedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import {D, MAIN} from '../../configs';
import Icon from 'react-native-vector-icons/AntDesign';
import ChapterList from './ChapterList';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedExpander = Animated.createAnimatedComponent(Pressable);
export default function FluidChapters() {
  //  const [toggleList, setToggleList] = React.useState(false);
  const toggleList = useSharedValue(false);
  const containerRef = useAnimatedRef();

  const styleListContainer = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      bottom: withSpring(toggleList.value ? 0 : 20, MAIN.spring),
      backgroundColor: '#d8d8d8',
      width: withSpring(toggleList.value ? D.WIDTH : D.WIDTH * 0.9),
      height: withSpring(
        toggleList.value ? D.HEIGHT * 0.8 : D.HEIGHT / 8,
        MAIN.spring,
      ),
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: withSpring(!toggleList.value ? 30 : 0),
      borderBottomRightRadius: withSpring(!toggleList.value ? 30 : 0),
      zIndex: 5,
      // justifyContent: 'center',
    };
  });

  const styleExpand = useAnimatedStyle(() => {
    return {
      height: 100,
      width: '30%',
      borderRadius: 30,

      backgroundColor: 'orange',
      position: 'absolute',
      right: 0,
      transform: [{scale: 0.6}, {rotate: toggleList.value ? '180deg' : '0deg'}],
      alignItems: 'center',
      justifyContent: 'center',
    };
  });
  const styleIcon = useAnimatedStyle(() => {
    return {maxHeight: 50};
  });
  const handleToggleList = () => {
    toggleList.value = !toggleList.value;
  };
  const styleLists = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            toggleList.value ? 0 : D.HEIGHT / 2,
            MAIN.spring,
          ),
        },
      ],
      opacity: withTiming(toggleList.value ? 1 : 0),
    };
  });
  return (
    <Animated.View ref={containerRef} style={[styleListContainer]}>
      <View style={{flex: 0.2}}>
        <AnimatedExpander
          onPress={handleToggleList.bind(this)}
          style={[styleExpand]}>
          <AnimatedIcon
            name={'up'}
            style={[styleIcon]}
            size={50}
            height="100%"
            width="100%"
            color="#eee"
          />
        </AnimatedExpander>
      </View>
      <View style={{flex: 1}}>
        <Animated.ScrollView style={[styleLists]}>
          <ChapterList />
        </Animated.ScrollView>
      </View>
    </Animated.View>
  );
}
