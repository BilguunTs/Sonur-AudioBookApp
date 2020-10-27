import React, {Component} from 'react';
import {View, VirtualizedList, Text, Image} from 'react-native';
import BookCard from '../components/BookHeroCard';
import { iOSUIKit } from 'react-native-typography'
const DATA = [
  {
    title: 'Dudasd',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      path: '',
    },
  },
  {
    title: 'Duder',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png',
      path: '',
    },
  },
  {
    title: 'Dudest',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
      path: '',
    },
  },
  {
    title: 'Dudeest',
    author: 'ude3',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png',
      path: '',
    },
  },
];
export default class HorizontalBookView extends Component {
  getItem = (data, index) => {
    return {
      id: Math.random().toString(12).substring(0),
      title: data[index].title,
      author: data[index].author,
      thumbnail: data[index].thumbnail,
    };
  };
  handlePress = (data) => {
    this.props.navigation.navigate('BookDetail', {...data});
  };
  render() {
    return (
      <View style={{marginBottom: 25}}>
        <View style={{margin: 10}}>
          <Text style={iOSUIKit.title3Emphasized}>{this.props.grouptitle || 'Hэр өгөөгyй'}</Text>
        </View>
        <VirtualizedList
          data={DATA}
          horizontal
          initialNumToRender={4}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View key={item.id} style={{margin: 15}}>
                <BookCard
                  onPress={this.handlePress.bind(this, item)}
                  title={item.title}
                  author={item.author}
                  img={item.thumbnail?.src}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          getItemCount={() => DATA.length}
          getItem={this.getItem.bind(this)}
        />
      </View>
    );
  }
}
