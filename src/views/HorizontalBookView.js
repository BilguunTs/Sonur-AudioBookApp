import React, {Component} from 'react';
import {View, VirtualizedList, Text, Pressable,Image} from 'react-native';
import BookCard from '../components/BookHeroCard';
import {iOSUIKit} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Feather'
import {withGlobalContext} from '../context'

 class HorizontalBookView extends Component {
  getItem = (data, index) => {
    return {
      id: data[index].id,
      title: data[index].title,
      isLocked:data[index].isLocked,
      price:data[index].price,
      author: data[index].author,
      thumbnail: data[index].thumbnail,
    };
  };
 
  handlePress = (data) => {
    this.props.navigation.navigate('BookDetail', {...data});
  };
  handleNavigate=()=>{
  
  this.props.navigation.navigate('BookLists',{grouptitle:this.props.grouptitle||""});
  }
  render() {
    const {stats} =this.props.global
    return (
      <View style={{marginBottom: 1}}>
        <Pressable
            onPress={this.handleNavigate}  
            android_ripple={{
              color:"#9088d4"
            }}>  
        <View style={{margin: 10,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
          <Text style={[iOSUIKit.title3Emphasized,{fontFamily:"Conforta",flex:1}]}>
            {this.props.grouptitle || 'Hэр өгөөгyй'}
          </Text>
          <Icon size={30} name={'arrow-right'} color={"#00000094"}/>
        </View>
          </Pressable>
          {stats.books.new_books.length!==0&&
        <VirtualizedList
          data={stats?.books.new_books}
          horizontal
          contentContainerStyle={{paddingHorizontal:10}}
          initialNumToRender={4}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View key={item.id} style={{marginHorizontal:7}} >
                <BookCard
                  price={item.price}
                  id={item.id}
                  animated
                  onPress={this.handlePress.bind(this, item)}
                  title={item.title}
                  author={item.author}
                  img={item.thumbnail?.src}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          getItemCount={() =>stats?.books.new_books.length}
          getItem={this.getItem.bind(this)}
        />}
      </View>
    );
  }
}
export default withGlobalContext(HorizontalBookView)