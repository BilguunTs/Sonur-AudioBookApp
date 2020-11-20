import React, {Component} from 'react';
import {Text,View} from 'react-native'
import{ BackWrapper} from './BackWrapper'
import Header from '../layout/Header'
import LinearGradient from 'react-native-linear-gradient'
export default class HeaderWithBackWrapper extends Component {
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
    <LinearGradient 
    style={{width:"100%",alignItems:'center',zIndex:-1 }} 
    colors={[ '#fff',"#f6f6f6",'rgba(255, 255, 255, 0.5)']}>               
       <Header transY={this.props.transY} 
               title={<Text style={{fontFamily:'Conforta'}}>Хайх..</Text>} />
            <BackWrapper Y={this.props.transY}>
        </BackWrapper>
      </LinearGradient>
    );
  }
}
