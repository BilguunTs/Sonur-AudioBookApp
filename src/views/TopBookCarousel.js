import React, {Component} from 'react';
import {D} from '../configs'
import Carousel from 'react-native-snap-carousel';
import BookCard from '../components/BookHeroCard';
import {BackWrapper} from '../components/BackWrapper'
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
