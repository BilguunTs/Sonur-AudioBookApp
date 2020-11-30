import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {iOSUIKit} from 'react-native-typography';
import {color} from '../configs'
export default class ReadBookIconBtn extends Component {  
  render() {
    return (
      <TouchableOpacity
        style={{
          height:80,
          width: 80,
        }}
        onPress={this.props.onPress}
        {...this.props}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: this.props.colorBtn || color.PRIMARY,
            borderRadius: 30,
            height: 40,
          }}>
          <Icon
            name="md-cart"
            color={this.props.colorIcon || '#121212'}
            style={{
              elevation: 2,
              opacity: this.props.iconOpacity || 0.5,
              textAlign: 'center',
            }}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
