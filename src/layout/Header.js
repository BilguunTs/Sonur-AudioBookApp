import React, {Children, Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {iOSUIKit} from 'react-native-typography';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {D, MAIN} from '../configs';

const HeaderWrapper = ({children, Y, ...rest}) => {
  const headerStyle = useAnimatedStyle(() => {
    const float = Y.value > 100;
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
      backgroundColor: float ? '#edf6f9' : 'transparent',
      borderRadius: 30,
      transform: [
        {scale: withSpring(float ? 0.9 : 1)},
        {translateY: withSpring(float ? 10 : 0)},
      ],
    };
  });
  return (
    <Animated.View {...rest} style={[headerStyle]}>
      {children}
    </Animated.View>
  );
};
const LeftPlaceHolderWrapper = ({children, Y}) => {
  const primaryTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: 1 - Y.value}],
      opacity: withSpring(Y.value <= 10 ? 1 : 0, MAIN.spring),
    };
  });
  const secondaryTitleStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      opacity: withSpring(Y.value <= 10 ? 0 : 1, MAIN.spring),
      transform: [{translateY: withSpring(Y.value <= 10 ? 20 : 0)}],
    };
  });
  return (
    <View style={{flexDirection: 'column'}}>
      <Animated.Text style={[primaryTitleStyle, iOSUIKit.title3,{fontFamily:"Conforta"}]}>
        {MAIN.app_name}
      </Animated.Text>
      <Animated.View style={[secondaryTitleStyle]}>{children}</Animated.View>
    </View>
  );
};
export default class Header extends Component {
  renderLeftAction = () => {
    const {type, contrast} = this.props;
    if (type === 'back') {
      return (
        <TouchableOpacity>
          <Ionicons
            name="md-arrow-back"
            style={{color: !contrast ? '#7400b8' : '#fff'}}
            size={35}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity>
        <Ionicons
          name="md-search-outline"
          size={35}
          style={{color: !contrast ? '#35cb6f' : '#fff'}}
        />
      </TouchableOpacity>
    );
  };
  getTitleVariation = () => {
    return !this.props.contrast ? (
      <Text style={{color: '#7400b8', fontFamily:"Conforta",...iOSUIKit.title3}}>
        {this.props.title}
      </Text>
    ) : (
      <Text style={[iOSUIKit.title3White,{fontFamily:"Conforta"}]}>{this.props.title}</Text>
    );
  };
  render() {
    const {contrast = false, transY, ...rest} = this.props;
    return (
      <HeaderWrapper Y={transY} {...rest}>
        <LeftPlaceHolderWrapper Y={transY}>
          {this.props.title && this.getTitleVariation()}
        </LeftPlaceHolderWrapper>
        {this.renderLeftAction()}
      </HeaderWrapper>
    );
  }
}
