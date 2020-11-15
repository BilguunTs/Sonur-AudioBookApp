import React from 'react';

import {TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {withGlobalContext} from '../../context'
import {D,MAIN}from '../../configs'
const WIDTH = D.WIDTH;
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
function CustomTabBar({state, descriptors, navigation,...args}) {
  const styleTabs = useAnimatedStyle(() => {
    let itemW = WIDTH * 0.7;
    let centered =WIDTH / 2 - itemW / 2
    let lpostion=args.global.stats.gplayer.isActive? centered+20:centered;
    return {
      flexDirection: 'row',
      backgroundColor: '#fffffc',
      height: 60,
      marginBottom: 15,
      width: itemW,
      left: lpostion,
      bottom: 0,
      position: 'absolute',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    };
  });

  const styleTab = useAnimatedStyle(() => {
    return {
      flex: 1,
      justifyContent: 'center',
      height: 50,
      margin: 4,
      borderRadius: 50,
    };
  });
  const getText = (txt, focused) => {
    const styleText = useAnimatedStyle(() => {
      return {
        color: '#64dfdf',
        textAlign: 'center',
        opacity: withSpring(focused ? 1 : 0, {damping: 20, stiffness: 90}),
        transform: [{scale: withSpring(focused ? 1.1 : 1)}],
      };
    });
    return <Animated.Text style={[styleText]}>{txt}</Animated.Text>;
  };
  const getIcon = (iconName, focused) => {
    let instance;
    const IconStyle = useAnimatedStyle(() => {
      return {
        textAlign: 'center',
        color: focused ? '#72efdd' : '#8d99ae',
        transform: [
          {
            scale: withSpring(focused ? 1.1 : 1, {
              damping: 20,
              stiffness: 90,
            }),
          },
          {
            translateY: withSpring(focused ? -5 : 10, {mass: 0.5}),
          },
        ],
      };
    });
    switch (iconName) {
      case 'Home':
        instance = (
          <AnimatedIcon
            name={focused ? 'md-home' : 'md-home-outline'}
            size={25}
            style={[IconStyle]}
          />
        );
        break;
      case 'Downloads':
        instance = (
          <AnimatedIcon
            name={focused ? 'md-download' : 'md-download-outline'}
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
  return (
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
  );
}
export default withGlobalContext(CustomTabBar);
