import React, {Component} from 'react';
import {View, VirtualizedList, Text, Pressable} from 'react-native';
import BookCard from '../components/BookHeroCard';
import {material, materialColors} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather';
import {withGlobalContext} from '../context';
import LottieView from 'lottie-react-native';
import {color, MAIN} from '../configs';
class HorizontalBookView extends Component {
  getItem = (data, index) => {
    return {
      id: data[index].id,
      title: data[index].title,
      isLocked: data[index].isLocked,
      price: data[index].price,
      author: data[index].author,
      thumbnail: data[index].thumbnail,
      about: data[index].about,
      audioFile: data[index].audioFile,
    };
  };

  handlePress = (data) => {
    this.props.navigation.navigate('BookDetail', {...data});
  };
  handleNavigate = () => {
    this.props.navigation.navigate('BookLists', {
      grouptitle: this.props.grouptitle || '',
    });
  };
  render() {
    const {stats, isOnline} = this.props.global;
    if (!isOnline) {
      return (
        <View>
          <Text>go to downloads</Text>
        </View>
      );
    }

    return (
      <View style={{marginBottom: 1}}>
        <Pressable
          onPress={this.handleNavigate}
          android_ripple={{
            color: color.ripple,
          }}>
          <View
            style={{
              margin: 10,
              marginHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'space-between',
            }}>
            <Text style={[material.title, {fontFamily: 'Conforta', flex: 1}]}>
              {this.props.grouptitle || 'Hэр өгөөгyй'}
            </Text>
            <Icon size={30} name={'arrow-right'} color={'#00000094'} />
          </View>
        </Pressable>
        {stats.books.new_books.length !== 0 && (
          <VirtualizedList
            data={stats?.books.new_books}
            horizontal
            contentContainerStyle={{paddingHorizontal: 10}}
            initialNumToRender={4}
            snapToInterval={MAIN.book.width}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View key={item.id} style={{marginHorizontal: 7}}>
                  <BookCard
                    price={item.price}
                    id={item.id}
                    animated
                    onPress={this.handlePress.bind(this, item)}
                    title={item.title}
                    author={item.author}
                    img={item.thumbnail}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            getItemCount={() => stats?.books.new_books.length}
            getItem={this.getItem.bind(this)}
          />
        )}
      </View>
    );
  }
}
export default withGlobalContext(HorizontalBookView);
