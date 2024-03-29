import React from 'react';
import {Pressable, View, StyleSheet, ToastAndroid, Alert} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';
import FluidChapters from '../../screens/AudioPlayer/FluidChapters';
import MainPlayer from '../../screens/AudioPlayer/MainPlayer';
import Header from '../../screens/AudioPlayer/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import {StickyContainer} from './StickyContainer'
import LottieView from 'lottie-react-native';
import {withGlobalContext} from '../../context';
import {D, MAIN, maxDrag, color} from '../../configs';

const WIDTH = D.WIDTH;
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);
const ALottieView = Animated.createAnimatedComponent(LottieView);
const CustomTabBar = ({state, descriptors, navigation, ...props}) => {
  const {dragValue, GplayerIsActive, methods} = props.global;

  const tapRef = React.useRef();
  // const [_update, setUpdate] = React.useState(false);
  const isToggled = useDerivedValue(() => {
    // if (dragValue.value === 0) {
    //   console.log('istoggled is true');
    //   runOnJS(props.global.methods.toggleGplayer)(true);
    //   return true;
    // } else if (dragValue.value === maxDrag) {
    //   console.log('istoggled is false');
    //   runOnJS(props.global.methods.toggleGplayer)(false);
    //   return false;
    // }
  }, [dragValue]);
  // React.useEffect(() => {
  //   setUpdate(stats.gplayer.isActive);
  // }, [stats.gplayer]);
  const pressing = useSharedValue(0);
  const getText = (txt, focused) => {
    const styleText = useAnimatedStyle(() => {
      return {
        color: '#9088d4',
        textAlign: 'center',
        opacity: withSpring(focused ? 1 : 0, {damping: 20, stiffness: 90}),
        transform: [{scale: withSpring(focused ? 1 : 0.9)}],
      };
    });
    return (
      <Animated.Text
        style={[styleText, {fontSize: 10, fontFamily: 'Conforta'}]}>
        {txt}
      </Animated.Text>
    );
  };
  const styleShrink = useAnimatedStyle(() => {
    const opacity = interpolate(
      dragValue.value,
      [0, maxDrag / 2],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      dragValue.value,
      [0, maxDrag],
      [1, 1],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      dragValue.value,
      [0, maxDrag],
      [0, maxDrag],
      Extrapolate.CLAMP,
    );
    const flex = interpolate(
      dragValue.value,
      [0, maxDrag],
      [3, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      flex,
      transform: [{scale}, {translateY}],
      overflow: 'hidden',
    };
  });
  const styleHeaderWrapper = useAnimatedStyle(() => {
    const opacity = interpolate(
      dragValue.value,
      [0, maxDrag / 2],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const width = interpolate(
      dragValue.value,
      [0, maxDrag + 100],
      [D.WIDTH, 0],
      Extrapolate.CLAMP,
    );
    return {
      width,
      opacity,
      overflow: 'hidden',
    };
  });
  const styleGrabber = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      dragValue.value,
      [0, maxDrag],
      [0, MAIN.CIRCLE_SIZE / 2],
      Extrapolate.CLAMP,
    );
    const bgOpacity = interpolate(
      dragValue.value,
      [0, maxDrag],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      flex: 1,
      justifyContent: 'center',
      borderRadius,
      backgroundColor: `rgba(144, 136, 212, ${bgOpacity})`,
    };
  });
  const handleCollapse = () =>
    (dragValue.value = withSpring(maxDrag, MAIN.spring));

  const handleEvent = useAnimatedGestureHandler({
    onStart: (_, c) => {
      c.startY = dragValue.value;
    },
    onActive: (e, ctx) => {
      let final = e.translationY + 0.4 * e.velocityY;
      dragValue.value = withSpring(ctx.startY + final, {damping: 500});
    },
    onEnd: (e, ctx) => {
      if (dragValue.value < maxDrag / 2) {
        dragValue.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      } else {
        dragValue.value = withTiming(maxDrag, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    },
  });
  const styleLottie = useAnimatedStyle(() => {
    const scale = interpolate(
      dragValue.value,
      [0, 1],
      [0, 1.3],
      Extrapolate.CLAMP,
    );
    return {
      opacity: dragValue.value < maxDrag * 0.9 ? withSpring(0) : withSpring(1),
      transform: [{scale}],
      maxHeight: MAIN.CIRCLE_SIZE,
      maxHeight: MAIN.CIRCLE_SIZE,
    };
  });
  const StickyContainer = () => {
    return (
      <View style={StyleSheet.absoluteFill}>
        <PanGestureHandler waitFor={tapRef} onGestureEvent={handleEvent}>
          <Animated.View style={styleGrabber}>
            <ALottieView
              autoPlay
              loop
              speed={0.6}
              source={require('../../animation/ripplewave.json')}
              style={styleLottie}
              colorFilters={[{keypath: 'button', color: color.PRIMARY}]}
              resizeMode="cover"
            />
            <Animated.View style={styleHeaderWrapper}>
              <Header
                text={props.global.stats.gplayer.title}
                isToggled={isToggled}
                dragValue={dragValue}
                maxDrag={maxDrag}
                onLeftAction={handleCollapse}
                onRightAction={() => {
                  methods.clearGplayer();
                  setTimeout(() => {
                    navigation.navigate('BookShelf');
                  }, 1000);
                }}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
        <Animated.View style={[styleShrink]}>
          <Animated.View style={[{flex: 3, justifyContent: 'center'}]}>
            <MainPlayer filepath={props.global.stats.gplayer.audioFile} />
          </Animated.View>
          <FluidChapters />
          <Animated.View style={[{flex: 1}]}></Animated.View>
        </Animated.View>
      </View>
    );
  };
  const getIcon = (iconName, focused) => {
    let instance;
    const IconStyle = useAnimatedStyle(() => {
      return {
        textAlign: 'center',
        color: focused ? '#9088d4' : '#8d99ae',
        transform: [
          {
            scale: withSpring(focused ? 1.1 : 1, {
              damping: 20,
              stiffness: 90,
            }),
          },
          {
            translateY: withSpring(focused ? -2 : 10, {mass: 0.1}),
          },
        ],
      };
    });
    switch (iconName) {
      case 'Home':
        instance = (
          <AnimatedIcon name={'book-open'} size={25} style={[IconStyle]} />
        );
        break;
      case 'BookShelf':
        instance = (
          <AnimatedIcon name={'bookshelf'} size={25} style={[IconStyle]} />
        );
        break;
      case 'Profile':
        instance = (
          <AnimatedIcon name={'account'} size={25} style={[IconStyle]} />
        );
        break;
      case 'Settings':
        instance = (
          <AnimatedIcon name={'toolbox'} size={25} style={[IconStyle]} />
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
  const styleGplayerContainer = useAnimatedStyle(() => {
    const width = interpolate(
      dragValue.value,
      [0, maxDrag],
      [D.WIDTH, MAIN.CIRCLE_SIZE * 0.4],
      Extrapolate.CLAMP,
    );
    const height = interpolate(
      dragValue.value,
      [0, maxDrag],
      [D.HEIGHT, MAIN.CIRCLE_SIZE * 0.4],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      dragValue.value,
      [0, maxDrag],
      [0, MAIN.CIRCLE_SIZE / 2],
      Extrapolate.CLAMP,
    );
    const bottom = interpolate(
      dragValue.value,
      [0, maxDrag],
      [0, MAIN.bottom_tab.HEIGHT / 2 - height / 2],
      Extrapolate.CLAMP,
    );
    return {
      width,
      height,
      zIndex: 7,
      bottom,
      position: 'absolute',
      left: WIDTH / 2 - width / 2,
      borderRadius,
      elevation: 13,
      backgroundColor: '#fff',
    };
  });
  const styleTabs = useAnimatedStyle(() => {
    let itemW = WIDTH;
    let centered = WIDTH / 2 - itemW / 2;
    return {
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: MAIN.bottom_tab.HEIGHT,
      width: itemW,
      left: centered,
      bottom: 0,
      position: 'absolute',
      elevation: 10,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [
        {
          translateY: interpolate(
            dragValue.value,
            [0, maxDrag],
            [MAIN.bottom_tab.HEIGHT, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      dragValue.value,
      [0, maxDrag],
      [D.HEIGHT, MAIN.bottom_tab.HEIGHT],
      Extrapolate.CLAMP,
    );
    return {
      position: 'absolute',
      height,
      width: D.WIDTH,
      bottom: 0,
      zIndex: 1,
    };
  });
  const tapStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      pressing.value,
      [0, 1],
      [1, 1.4],
      Extrapolate.CLAMP,
    );
    return {transform: [{scale}]};
  });

  const handlTapEvent = useAnimatedGestureHandler({
    onActive: () => {
      if (dragValue.value === 0) {
        return console.log('will do somethin');
      }
      pressing.value = withSpring(1);
    },
    onEnd: () => {
      pressing.value = withSpring(0);
    },
    onCancel: () => {
      pressing.value = withSpring(0);
    },
  });

  return (
    <>
      <Animated.View style={[containerStyle]}>
        {GplayerIsActive.value === 1 && (
          <LongPressGestureHandler
            ref={tapRef}
            maxDurationMs={1000}
            onHandlerStateChange={handlTapEvent}>
            <Animated.View style={[styleGplayerContainer, tapStyle]}>
              {StickyContainer()}
            </Animated.View>
          </LongPressGestureHandler>
        )}
        <Animated.View style={[styleTabs]}>
          {GplayerIsActive.value === 0 && (
            <Pressable
              onPress={() => {
                ToastAndroid.show('Хоосон 😗', 1000);
              }}
              onLongPress={() => {
                Alert.alert(
                  '▶ Сонур тоглуулагч',
                  '👋 Таны татсан ном энэ хэсэгт тоглуулагдах болно 😀',
                  [{text: 'Ok', onPress: () => {}}],
                  {cancelable: false},
                );
              }}
              style={styled.circle}
              android_ripple={{borderless: true, color: color.ripple}}
            />
          )}
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
                android_ripple={{borderless: true, color: color.ripple}}
                accessibilityRole="button"
                key={route.key}
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  {
                    marginRight: index === 1 ? MAIN.CIRCLE_SIZE / 3 : 0,
                    marginLeft: index === 2 ? MAIN.CIRCLE_SIZE / 3 : 0,
                  },
                  styleTab,
                ]}>
                {getIcon(route.name, isFocused)}
                {getText(label, isFocused)}
              </AnimatedTouchable>
            );
          })}
        </Animated.View>
      </Animated.View>
    </>
  );
};
const styled = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: MAIN.CIRCLE_SIZE * 0.4,
    height: MAIN.CIRCLE_SIZE * 0.4,
    borderRadius: (MAIN.CIRCLE_SIZE * 0.4) / 2,
    bottom: MAIN.bottom_tab.HEIGHT / 2 - (MAIN.CIRCLE_SIZE * 0.4) / 2,
    zIndex: 8,
    borderColor: color.PRIMARY,
    borderWidth: 1,
    backgroundColor: color.ripple,
    left: WIDTH / 2 - (MAIN.CIRCLE_SIZE * 0.4) / 2,
  },
});
export default withGlobalContext(CustomTabBar);
