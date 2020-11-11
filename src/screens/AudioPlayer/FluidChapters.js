import React from 'react';
import { Text, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedRef,
  withTiming,
  withDecay,
} from 'react-native-reanimated';
import {D, MAIN} from '../../configs';
import Icon from 'react-native-vector-icons/AntDesign';
import ChapterList from './ChapterList';
import {iOSUIKit} from 'react-native-typography'
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
        toggleList.value ? D.HEIGHT * 0.8 : D.HEIGHT / 9,
        MAIN.spring,
      ),
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: withSpring(!toggleList.value ? 25 : 0),
      borderBottomRightRadius: withSpring(!toggleList.value ? 25 : 0),
      zIndex: 5,
      // justifyContent: 'center',
    };
  });
const styledExpandWrapper=useAnimatedStyle(()=>{
  return {
    position:"relative",
    alignItems:'flex-end',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',
    marginLeft:15,
    
  }
})
  const styleExpand = useAnimatedStyle(() => {
    return {
      height:D.HEIGHT/9,
      width: '25%',
      borderRadius: 30,
      backgroundColor: 'orange',
      transform: [{scale:0.8},{rotate: toggleList.value ? '180deg' : '0deg'}],
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
       paddingHorizontal:5,
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
     
      <Animated.View style={[styledExpandWrapper]}>
        <Text style={[iOSUIKit.title3,{maxWidth:D.WIDTH*0.6}]} numberOfLines={1}>
          Current chapter
        </Text>
      <AnimatedExpander
          onPress={handleToggleList.bind(this)}
          style={[styleExpand]}>
          <AnimatedIcon
            name={'up'}
            style={[styleIcon]}
            size={30}
            height="100%"
            width="100%"
            color="#eee"
          />
        </AnimatedExpander>
            </Animated.View>
        <Animated.ScrollView style={[styleLists]}>
          <ChapterList  />
        </Animated.ScrollView>
      
    </Animated.View>
  );
}
