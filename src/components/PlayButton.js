import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {iOSUIKit} from 'react-native-typography';
export default class ReadBookIconBtn extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          shadowColor: this.props.colorBtn,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          height: this.props.size * 2,
          width: this.props.size * 2,
          elevation: this.props.elevation || 3,
        }}
        onPress={this.props.onPress}
        {...this.props}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: this.props.colorBtn || 'orange',
            borderRadius: 30,
            height: 40,
          }}>
          <Icon
            name="md-play"
            color={this.props.colorIcon || '#121212'}
            style={{
              elevation: 2,
              opacity: this.props.iconOpacity || 0.5,
              textAlign: 'center',
            }}
            size={this.props.size || 30}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
