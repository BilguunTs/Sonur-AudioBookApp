import React, {Component} from 'react';
import {D} from '../configs'
import Carousel from 'react-native-snap-carousel';
import BookCard from '../components/BookHeroCard';

import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
const WIDTH = D.WIDTH
const DUMMY = [
  {
    title: 'Байх ба биш',
    author: 'МолорЭрдэнэ',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png',
      path: '',
    },
  },
  {
    title: 'Байх ба хугацаа',
    author: 'МолорЭрдэнэ',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png',
      path: '',
    },
  },
  {
    title: 'Эрх чөлөө эрхэм үг',
    author: 'МолорЭрдэнэ',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png',
      path: '',
    },
  },
];
const BackWrapper = ({Y, children}) => {
  const styleContainer = useAnimatedStyle(() => {
    const Value = 350 - Y.value * 2;
    return {
      backgroundColor: '#dbe0e9',
      borderBottomLeftRadius: withSpring(Value, {damping: 20, stiffness: 90}),
      borderBottomRightRadius: withSpring(Value, {damping: 20, stiffness: 90}),
      transform: [
        {translateY: withSpring(1 - Y.value, {damping: 20, stiffness: 90})},
      ],
    };
  });
  const styleChildren = useAnimatedStyle(() => {
    return {
      marginTop: 100,
      transform: [
        {translateY: withSpring(1 - Y.value * 2, {damping: 20, stiffness: 90})},
      ],
    };
  });
  return (
    <Animated.View style={[styleContainer]}>
      <Animated.View style={[styleChildren]}>{children}</Animated.View>
    </Animated.View>
  );
};
export default class TopBookCarousel extends Component {
  handlePress = (data) => {
    this.props.navigation.navigate('BookDetail', {...data});
  };
  _renderItem = ({item}) => {
    return (
      <BookCard
        img={item.thumbnail.src}
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
