import React, {Component} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {iOSUIKit} from 'react-native-typography';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
} from 'react-native-reanimated';
import SonurLogo from '../svg/logowithletter.png';
import {D, MAIN} from '../configs';

const MAX_DRAG = D.HEIGHT / 3;
const HeaderWrapper = ({children, Y, relative, ...rest}) => {
  const headerStyleSticky = useAnimatedStyle(() => {
    const scale = interpolate(
      Y.value,
      [0, MAX_DRAG],
      [1, 0.9],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      Y.value,
      [0, MAX_DRAG],
      [0, 10],
      Extrapolate.CLAMP,
    );
    const colorAlpha = interpolate(scale, [1, 0.9], [0, 1], Extrapolate.CLAMP);
    const elevation = interpolate(scale, [1, 0.9], [0, 3], Extrapolate.CLAMP);
    return {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      height: 60,
      width: D.WIDTH,
      zIndex: 10,
      position: 'absolute',
      top: 10,
      elevation,
      padding: 10,
      backgroundColor: `rgba(237, 246, 249, ${colorAlpha})`,
      borderRadius: 15,
      transform: [
        {scale: withSpring(scale)},
        {translateY: withSpring(translateY)},
      ],
    };
  });
  const headerStyleRelative = useAnimatedStyle(() => {
    return {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      width: D.WIDTH,
      zIndex: 10,
      position: 'absolute',
      top: 0,
      padding: 20,
      backgroundColor: '#edf6f9',
      borderRadius: 30,
      transform: [{scale: 0.9}, {translateY: 8}],
    };
  });
  return (
    <Animated.View
      {...rest}
      style={[relative ? headerStyleRelative : headerStyleSticky]}>
      {children}
    </Animated.View>
  );
};
const LeftPlaceHolderWrapper = ({children, Y}) => {
  const primaryTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Y.value,
      [0, MAX_DRAG / 2],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      Y.value,
      [0, MAX_DRAG / 2],
      [0, 20],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: withSpring(translateY)}],
      opacity,
    };
  });
  const secondaryTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Y.value,
      [0, MAX_DRAG],
      [0, 1],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      Y.value,
      [0, MAX_DRAG / 2],
      [20, 0],
      Extrapolate.CLAMP,
    );
    return {
      position: 'absolute',
      top: 20,
      opacity,
      transform: [{translateY}],
    };
  });
  return (
    <View style={{flexDirection: 'column'}}>
      <Animated.View style={[primaryTitleStyle]}>
        <Image source={SonurLogo} style={{height: 60, width: 75}} />
      </Animated.View>
      <Animated.View style={[secondaryTitleStyle]}>{children}</Animated.View>
    </View>
  );
};
export default class Header extends Component {
  renderLeftAction = () => {
    const {type, contrast, backAction = false, ...rest} = this.props;
    if (type === 'back' || backAction === true) {
      return (
        <Pressable
          android_ripple={{borderless: true}}
          onPress={() => rest.navigation.goBack()}>
          <Ionicons
            name="md-arrow-back"
            style={{color: !contrast ? '#212121' : '#fff', opacity: 0.6}}
            size={35}
          />
        </Pressable>
      );
    }
    return (
      <Pressable android_ripple={{borderless: true}}>
        <Ionicons
          name="md-search-outline"
          size={35}
          style={{color: !contrast ? '#706897' : '#fff'}}
        />
      </Pressable>
    );
  };
  getTitleVariation = () => {
    return !this.props.contrast ? (
      <Text
        style={{color: '#7400b8', fontFamily: 'Conforta', ...iOSUIKit.title3}}>
        {this.props.title}
      </Text>
    ) : (
      <Text style={[iOSUIKit.title3White, {fontFamily: 'Conforta'}]}>
        {this.props.title}
      </Text>
    );
  };
  render() {
    const {contrast = false, transY = 0, replace = false, ...rest} = this.props;
    if (rest.relative) {
      return (
        <HeaderWrapper Y={transY} {...rest}>
          {replace && this.renderLeftAction()}
          {replace && this.props.title && this.getTitleVariation()}
          {!replace && this.props.title && this.getTitleVariation()}
          {!replace && this.renderLeftAction()}
        </HeaderWrapper>
      );
    }
    return (
      <HeaderWrapper Y={transY} {...rest}>
        {!replace && (
          <>
            <LeftPlaceHolderWrapper Y={transY}>
              {this.props.title && this.getTitleVariation()}
            </LeftPlaceHolderWrapper>
            {this.renderLeftAction()}
          </>
        )}
        {replace && (
          <>
            {this.renderLeftAction()}
            <LeftPlaceHolderWrapper Y={transY}>
              {this.props.title && this.getTitleVariation()}
            </LeftPlaceHolderWrapper>
          </>
        )}
      </HeaderWrapper>
    );
  }
}
