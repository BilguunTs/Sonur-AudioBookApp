import React, {Component} from 'react';
import {View, VirtualizedList, Text, Pressable} from 'react-native';
import BookCard from '../components/BookHeroCard';
import {material, materialColors} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather';
import {withGlobalContext} from '../context';
//import LottieView from 'lottie-react-native';
import {getCachePath} from '../utils';
import {color, MAIN, D} from '../configs';
class HorizontalBookView extends Component {
  getItem = (data, index) => {
    console.log(data[index].isLocked);
    return {
      id: data[index].id,
      title: data[index].title,
      isLocked: data[index].isLocked,
      price: data[index].price,
      author: data[index].author,
      thumbnail: data[index].thumbnail,
      about: data[index].about,
      isLocked: data[index].isLocked,
      audioFile: data[index].audioFile,
    };
  };

  handlePress = (data) => {
    const {downloads} = this.props.global;
    const key = data.id;
    const isDownloaded = downloads[key] !== undefined;
    if (isDownloaded) {
      const {thumbnail, ...rest} = data;
      const _path = getCachePath(key);
      this.props.navigation.navigate('BookDetail', {
        audioFile: _path.audio,
        thumbnail: 'file://' + _path.img,
        isDownloaded,
        ...rest,
      });
    } else {
      this.props.navigation.navigate('BookDetail', {isDownloaded, ...data});
    }
  };
  handleNavigate = () => {
    this.props.navigation.navigate('BookLists', {
      grouptitle: this.props.grouptitle || '',
    });
  };
  render() {
    const {isOnline, newBooks} = this.props.global;
    if (!isOnline) {
      return (
        <View
          style={{
            height: D.HEIGHT / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            android_ripple={{color: color.ripple}}
            style={{
              backgroundColor: '#f6f6f6',
              elevation: 5,
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
            }}
            onPress={() => {
              this.props.navigation.navigate('BookShelf');
            }}>
            <Icon
              name="download"
              size={25}
              color={color.PRIMARY}
              style={{marginRight: 5}}
            />
            <Text style={[material.button, {fontFamily: 'Conforta'}]}>
              Татсан
            </Text>
          </Pressable>
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
        {newBooks.length !== 0 && (
          <VirtualizedList
            data={newBooks}
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
                    isLocked={item.isLocked}
                    onPress={this.handlePress.bind(this, item)}
                    title={item.title}
                    author={item.author}
                    img={item.thumbnail}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            getItemCount={() => newBooks.length}
            getItem={this.getItem.bind(this)}
          />
        )}
      </View>
    );
  }
}
export default withGlobalContext(HorizontalBookView);
