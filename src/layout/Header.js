import React, {Children, Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {iOSUIKit} from 'react-native-typography';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
const WIDTH = Dimensions.get('window').width;

const HeaderWrapper = ({children, Y, ...rest}) => {
  const headerStyle = useAnimatedStyle(() => {
    const float = Y.value > 100;
    return {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      width: WIDTH,
      zIndex: 10,
      position: 'absolute',
      top: 0,
      padding: 20,
      backgroundColor: float ? '#F8F8FF' : 'transparent',
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
export default class Header extends Component {
  renderLeftAction = () => {
    const {type, contrast} = this.props;
    if (type === 'back') {
      return (
        <TouchableOpacity>
          <Ionicons
            name="md-arrow-back"
            style={{color: !contrast ? '#121212' : '#fff'}}
            size={35}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity>
        <Ionicons
          name="md-menu"
          size={35}
          style={{color: !contrast ? '#121212' : '#fff'}}
        />
      </TouchableOpacity>
    );
  };
  render() {
    const {contrast = false, transY, ...rest} = this.props;
    return (
      <HeaderWrapper Y={transY} {...rest}>
        {this.props.title && (
          <Text style={!contrast ? iOSUIKit.title3 : iOSUIKit.title3White}>
            {this.props.title}
          </Text>
        )}
        {this.renderLeftAction()}
      </HeaderWrapper>
    );
  }
}
