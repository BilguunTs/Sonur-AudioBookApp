import React, {Component} from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FloatingFooterActions extends Component {
  constructor(props){
      super(props)
      this.size=this.props.size||40
  }
  render() {
    return (
      <Pressable style={{
          height: this.size * 2,
          width: this.size * 2,
        }}
        onPress={this.props.onPress}
        {...this.props}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: this.props.colorBtn || 'green',
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
      </Pressable>
    );
  }
}
