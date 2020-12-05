import React from 'react';
import { Text, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedProps,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import {D, MAIN,color} from '../../configs';
import Icon from 'react-native-vector-icons/Feather';
import ChapterList from './ChapterList';
import {iOSUIKit} from 'react-native-typography'
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export default function FluidChapters() {
  //  const [toggleList, setToggleList] = React.useState(false);
  const toggleList = useSharedValue(0);
  const styleListContainer = useAnimatedStyle(() => {
    const bottom = interpolate(toggleList.value,[0,1],[20,0],Extrapolate.CLAMP)
    const width=interpolate(toggleList.value,[0,1],[D.WIDTH*0.9,D.WIDTH],Extrapolate.CLAMP) 
    const height=interpolate(toggleList.value,[0,1],[D.HEIGHT/9,D.HEIGHT*0.75],Extrapolate.CLAMP) 
    const borderR = interpolate(toggleList.value,[0,1],[25,0],Extrapolate.CLAMP)
    const left =interpolate(toggleList.value,[0,1],[D.WIDTH/2-width/2,0],Extrapolate.CLAMP)
    const elevation =interpolate(toggleList.value,[0,1],[0,10],Extrapolate.CLAMP)
    return {
      zIndex:10,
      position: 'absolute',
      bottom,
      backgroundColor:'#f6f6f6',
      width,
      height,
      left,
      elevation,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: borderR,
      borderBottomRightRadius:borderR,
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
      transform: [{scale:0.8}],
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"transparent"
    };
  });
  const styleIcon = useAnimatedStyle(() => {
    return {maxHeight: 50};
  });
  const handleToggleList = () => {
    toggleList.value =withSpring(toggleList.value===1?0:1,MAIN.spring) 
  };
  const styleLists = useAnimatedStyle(() => {
    const translateY= interpolate(toggleList.value,
      [0,1],
      [D.HEIGHT/2,0],
      Extrapolate.CLAMP)
    return {
       paddingHorizontal:5,
       transform: [
        {
          translateY,
        },
      ],
      opacity:toggleList.value,
    };
  });
  const animatedIconProps = useAnimatedProps(()=>{
    return {name:!toggleList.value?"list":"chevron-down"}
  })
  const toggleVolumeMix =()=>{
    console.log("volume mix")
  }
  return (
    <Animated.View  style={[styleListContainer]}>
      <Animated.View style={[styledExpandWrapper]}>
        <Text style={[iOSUIKit.body,{maxWidth:D.WIDTH*0.6,fontFamily:"Conforta"}]} numberOfLines={1}>
          Current chapter
        </Text>
        <AnimatedPressable
          android_ripple={{color:color.ripple,borderless:true}}
          onPress={toggleVolumeMix.bind(this)}
          style={[styleExpand]}>
          <AnimatedIcon
            name="sliders"
            style={[styleIcon]}
            size={30}
            height="100%"
            width="100%"
            color={'orange'}
          />
        </AnimatedPressable>
      <AnimatedPressable
          android_ripple={{color:color.ripple,borderless:true}}
          onPress={handleToggleList.bind(this)}
          style={[styleExpand]}>
          <AnimatedIcon
            animatedProps={animatedIconProps}
            style={[styleIcon]}
            size={30}
            height="100%"
            width="100%"
            color={color.PRIMARY}
          />
        </AnimatedPressable>
            </Animated.View>
        <Animated.ScrollView style={[styleLists]}>
          <ChapterList  />
        </Animated.ScrollView>
      
    </Animated.View>
  );
}
