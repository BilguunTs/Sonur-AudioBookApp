import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import {iOSUIKit} from 'react-native-typography';
import {color} from '../configs';
export default class ReadBookIconBtn extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          height: this.props.size * 2,
          width: this.props.size * 2,
        }}
        onPress={this.props.onPress}
        {...this.props}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: this.props.colorBtn || color.BackGround,
            borderRadius: 30,
            elevation: 10,
            height: 40,
          }}>
          <Icon
            name={this.props.downloadMode ? 'download' : 'play'}
            color={this.props.colorIcon || color.PRIMARY}
            style={{
              elevation: 2,
              opacity: this.props.iconOpacity || 1,
              textAlign: 'center',
            }}
            size={this.props.size || 30}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
