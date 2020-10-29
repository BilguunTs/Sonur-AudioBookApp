import React, {Component} from 'react';
import {Dimensions, View, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BookCard from '../components/BookHeroCard';
import {iOSUIKit} from 'react-native-typography';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
const WIDTH = Dimensions.get('window').width;
const DUMMY = [
  {title: 'Байх ба биш', author: 'МолорЭрдэнэ'},
  {title: 'Байх ба хугацаа', author: 'МолорЭрдэнэ'},
  {title: 'Эрх чөлөө эрхэм үг', author: 'МолорЭрдэнэ'},
];
const BackWrapper = ({Y, children}) => {
  const styleContainer = useAnimatedStyle(() => {
    const Value = 250 - Y.value * 3;
    return {
      backgroundColor: '#caffbf',
      borderBottomLeftRadius: withSpring(Value),
      borderBottomRightRadius: withSpring(Value),
      transform: [{translateY: withSpring(1 - Y.value)}],
    };
  });
  const styleChildren = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withSpring(1 - Y.value * 2)}],
    };
  });
  return (
    <Animated.View style={[styleContainer]}>
      <Animated.View style={[styleChildren]}>{children}</Animated.View>
    </Animated.View>
  );
};
export default class TopBookCarousel extends Component {
  constructor(props) {
    super(props);
  }
  handlePress = (data) => {
    this.props.navigation.navigate('BookDetail', {...data});
  };
  _renderItem = ({item, index}) => {
    return (
      <BookCard
        onPress={this.handlePress.bind(this, item)}
        title={item.title}
        author={item.author}
      />
    );
  };

  render() {
    return (
      <BackWrapper Y={this.props.transY}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={DUMMY}
          inactiveSlideScale={0.7}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          renderItem={this._renderItem}
          sliderWidth={WIDTH}
          sliderHeight={100}
          itemWidth={122}
        />
      </BackWrapper>
    );
  }
}
