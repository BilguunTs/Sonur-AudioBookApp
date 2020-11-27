import React from 'react';

import {TouchableOpacity,StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue,withSpring,interpolate,Extrapolate} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import Gplayer from '../../screens/AudioPlayer'
import {withGlobalContext} from '../../context'
import {D,MAIN}from '../../configs'
const WIDTH = D.WIDTH;
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const CustomTabBar=({state, descriptors, navigation,...args})=> {
  const dragValue=useSharedValue(0)
  const maxDrag=D.HEIGHT-MAIN.bottom_tab.HEIGHT  
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
      margin: 4,
      borderRadius: 50,
    };
  });
  const styleGplayerContainer =useAnimatedStyle(()=>{
    const width = interpolate(dragValue.value,
      [0,maxDrag],
      [D.WIDTH,D.WIDTH/4],
      Extrapolate.CLAMP);
    const height= interpolate(dragValue.value,
      [0,maxDrag],
      [D.HEIGHT,MAIN.bottom_tab.HEIGHT],
      Extrapolate.CLAMP)
    const borderRadius =interpolate(dragValue.value,
      [0,maxDrag],
      [0,width/2],
      Extrapolate.CLAMP)
    return {
      width,
      height,
      left:WIDTH / 2 - width / 2,
      borderRadius,
      transform:[{translateY:interpolate(
        dragValue.value,
        [0,maxDrag],
        [0,D.HEIGHT*0.8],
        Extrapolate.CLAMP)}],
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
      borderTopLeftRadius: 25,
      borderTopRightRadius:25,
      justifyContent: 'center',
      alignItems: 'center',
      transform:[{translateY:interpolate(dragValue.value,
        [0,D.HEIGHT*0.5],
        [MAIN.bottom_tab.HEIGHT,0],
        Extrapolate.CLAMP
        )}]
    };
  });
  return (<>
    <Animated.View style={[StyleSheet.absoluteFill,styleGplayerContainer]}>
    <Gplayer dragValue={dragValue} global={args.global}/>
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
            style={[styleTab]}>
            {getIcon(route.name, isFocused)}
            {getText(label, isFocused)}
          </AnimatedTouchable>
        );
      })}
    </Animated.View>
    </>
  );
}

export default withGlobalContext(CustomTabBar);