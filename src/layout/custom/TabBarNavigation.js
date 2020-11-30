import React from 'react';
import {TouchableOpacity,StyleSheet,View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
  } from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import FluidChapters from '../../screens/AudioPlayer/FluidChapters';
import MainPlayer from '../../screens/AudioPlayer/MainPlayer';
import Header from '../../screens/AudioPlayer/Header'
import {withGlobalContext} from '../../context'
import {D,MAIN,color}from '../../configs'


const WIDTH = D.WIDTH;
const maxDrag=D.HEIGHT*0.6  
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const StickyContainer = ({dragValue})=> {
  const styleShrink =useAnimatedStyle(()=>{
    const opacity=interpolate(dragValue.value,
      [0,maxDrag/2],
      [1,0],
      Extrapolate.CLAMP)
    const scale =interpolate(dragValue.value,
      [0,maxDrag],
      [1,1],
      Extrapolate.CLAMP)
    const translateY=interpolate(dragValue.value,
      [0,maxDrag],
      [0,maxDrag],
      Extrapolate.CLAMP)
    const flex=interpolate(dragValue.value,[0,maxDrag],[3,0],Extrapolate.CLAMP)
    return {
      opacity,
      flex,
      transform:[{scale},{translateY}],
      overflow:'hidden'
    }
  })
  const styleHeaderWrapper =useAnimatedStyle(()=>{
    const opacity = interpolate(dragValue.value,[0,maxDrag/2],[1,0],Extrapolate.CLAMP)
    const width=interpolate(dragValue.value,[0,maxDrag+100],[D.WIDTH,0],Extrapolate.CLAMP)
    return {
      width,
      opacity,
      overflow:'hidden',
    }
  })
  const styleGrabber =useAnimatedStyle(()=>{
    const borderRadius = interpolate(dragValue.value,[0,maxDrag],[0,MAIN.CIRCLE_SIZE/2],Extrapolate.CLAMP)
    const bgOpacity=interpolate(dragValue.value,[0,maxDrag],[0,1],Extrapolate.CLAMP)
    return {
     flex:1,
     justifyContent:'center',
     borderRadius,
     backgroundColor:`rgba(144, 136, 212, ${bgOpacity})`,
    }
  })
  const handleCollapse=()=>dragValue.value=withSpring(maxDrag,MAIN.spring)

  const handleEvent=useAnimatedGestureHandler({
    onStart:(_,c)=>{
      c.startY=dragValue.value
    },
    onActive:(e,ctx)=>{
      dragValue.value=ctx.startY+e.translationY
    },
    onEnd:(e,ctx)=>{
      if(e.translationY<maxDrag/2){
        dragValue.value=withSpring(0,MAIN.spring)
      }else{
        dragValue.value=withSpring(maxDrag,MAIN.spring)
      }
    }
  })
  return (<View style={StyleSheet.absoluteFill}>
    <PanGestureHandler onGestureEvent={handleEvent}>
    <Animated.View style={styleGrabber}>
      <Animated.View style={styleHeaderWrapper}>
      <Header dragValue={dragValue} maxDrag={maxDrag}  leftAction={handleCollapse}/>
      </Animated.View>
    </Animated.View>
    </PanGestureHandler>
  <Animated.View style={[styleShrink]} >
    <Animated.View style={[{flex:3,justifyContent:'center'}]}>
      <MainPlayer  filename="testaudio.mp3" />
    </Animated.View>
    <Animated.View style={[{flex:1,alignItems:'center' }]}>
      <FluidChapters />
      </Animated.View> 
   </Animated.View>
  </View>
  );
}
const CustomTabBar=({state, descriptors, navigation,...args})=> {
  const dragValue=useSharedValue(maxDrag)
  const getText = (txt, focused) => {
    const styleText = useAnimatedStyle(() => {
      return {
        color: '#9088d4',
        textAlign: 'center',
        opacity: withSpring(focused ? 1 : 0, {damping: 20, stiffness: 90}),
        transform: [{scale: withSpring(focused ? 1 : 0.9)}],
      };
    });
    return <Animated.Text style={[styleText,{fontFamily:"Conforta"}]}>{txt}</Animated.Text>;
  };
  const getIcon = (iconName, focused) => {
    let instance;
    const IconStyle = useAnimatedStyle(() => {
      return {
        textAlign: 'center',
        color: focused ? '#9088d4' : '#8d99ae',
        transform: [
          {
            scale: withSpring(focused ? 1.1 :1 , {
              damping: 20,
              stiffness: 90,
            }),
          },
          {
            translateY: withSpring(focused ? -2 : 10, {mass: 0.5}),
          },
        ],
      };
    });
    switch (iconName) {
      case 'Home':
        instance = (
          <AnimatedIcon
            name={focused ? 'md-book' : 'md-book-outline'}
            size={25}
            style={[IconStyle]}
          />
        );
        break;
      case 'BookShelf':
        instance = (
          <AnimatedIcon
            name={focused ? 'md-albums' : 'md-albums-outline'}
            size={25}
            style={[IconStyle]}
          />
        );
        break;
      case 'Profile':
        instance = (
          <AnimatedIcon
            name={focused ? 'md-person' : 'md-person-outline'}
            size={25}
            style={[IconStyle]}
          />
        );
        break;
      case 'Settings':
          instance = (
            <AnimatedIcon
              name={focused ? 'md-settings' : 'md-settings-outline'}
              size={25}
              style={[IconStyle]}
            />
          );
          break;
      default:
        instance = null;
    }
    return instance;
  };
  const styleTab = useAnimatedStyle(() => {
    return {
      flex: 1,
      justifyContent: 'center',
      height: 50,
      margin: 0,
      borderRadius: 50,
    };
  });
  const styleGplayerContainer =useAnimatedStyle(()=>{
    const width = interpolate(dragValue.value,
      [0,maxDrag],
      [D.WIDTH,MAIN.CIRCLE_SIZE*0.4],
      Extrapolate.CLAMP);
    const height= interpolate(dragValue.value,
      [0,maxDrag],
      [D.HEIGHT,MAIN.CIRCLE_SIZE*0.4],
      Extrapolate.CLAMP)
    const borderRadius =interpolate(dragValue.value,
      [0,maxDrag],
      [0,MAIN.CIRCLE_SIZE/2],
      Extrapolate.CLAMP)
    const bottom =interpolate(dragValue.value,
      [0,D.HEIGHT*0.5],
      [0,MAIN.bottom_tab.HEIGHT-(MAIN.CIRCLE_SIZE*0.5)],
      Extrapolate.CLAMP)
    return {
      width,
      height,
      zIndex:7,
      bottom,
      position:'absolute',
      left:WIDTH / 2 - width / 2,
      borderRadius,
      elevation:15,
      backgroundColor:"#fff",
    }
  })
  const styleTabs = useAnimatedStyle(() => {
    let itemW = WIDTH ;
    let centered =WIDTH / 2 - itemW / 2
    return {
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: MAIN.bottom_tab.HEIGHT,
      width: itemW,
      left:centered,
      bottom: 0,
      position: 'absolute',
      elevation:10,
      borderTopLeftRadius: 15,
      borderTopRightRadius:15,
      justifyContent: 'center',
      alignItems: 'center',
      transform:[{translateY:interpolate(dragValue.value,
        [0,maxDrag],
        [MAIN.bottom_tab.HEIGHT,0],
        Extrapolate.CLAMP
        )}]
    };
  });
  const containerStyle=useAnimatedStyle(()=>{
    const height=interpolate(dragValue.value,
      [0,maxDrag],[D.HEIGHT,MAIN.bottom_tab.HEIGHT],Extrapolate.CLAMP)
    return {
     position:'absolute',
     height,
     width:D.WIDTH,
     bottom:0,
     zIndex:1,
    }
  })
  return (<Animated.View style={[containerStyle]}>
    <Animated.View style={[styleGplayerContainer]}>
    <StickyContainer dragValue={dragValue} global={args.global}/>
    </Animated.View>
    <Animated.View style={[styleTabs]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <AnimatedTouchable
            accessibilityRole="button"
            key={route.key}
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[{
              marginRight:index===1?MAIN.CIRCLE_SIZE/3:0,
              marginLeft:index===2?MAIN.CIRCLE_SIZE/3:0
              },styleTab]}>
            {getIcon(route.name, isFocused)}
            {getText(label, isFocused)}
          </AnimatedTouchable>
        );
      })}
    </Animated.View>
    </Animated.View>
  );
}

export default withGlobalContext(CustomTabBar);