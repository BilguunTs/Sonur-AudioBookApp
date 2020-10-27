import React, {Component} from 'react';
import {Dimensions, View, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BookCard from '../components/BookHeroCard';
import {iOSUIKit} from 'react-native-typography'
const WIDTH = Dimensions.get('window').width;
const DUMMY = [
  {title: 'Байх ба биш', author: 'МолорЭрдэнэ'},
  {title: 'Байх ба хугацаа', author: 'МолорЭрдэнэ'},
  {title: 'Эрх чөлөө эрхэм үг', author: 'МолорЭрдэнэ'},
];
export default class TopBookCarousel extends Component {
  handlePress = (data) => {
    this.props.navigation.navigate('BookDetail', {...data});
  };
  _renderItem = ({item, index}) => {
    return (
      <BookCard
        contrast
        onPress={this.handlePress.bind(this, item)}
        title={item.title}
        author={item.author}
      />
    );
  };

  render() {
    return (
      <View style={{backgroundColor:'#5ABD8C',borderBottomLeftRadius:200,borderBottomRightRadius:200}}>
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
        
      </View>
    );
  }
}
