import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Downloads from '../views/Downloads'
export default class BookShelf extends Component {
  render() {
    return (
      <View>
        <Downloads navigation={this.props.navigation}/>
      </View>
    );
  }
}
