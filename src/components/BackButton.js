import React, {PureComponent} from 'react';
import {TouchableOpacity,  View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class BackButton extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        {...this.props}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          borderWidth:1,
            borderRadius:10,
            borderColor:"gray",
            height: 40,
            width:40
            
          }}>
          <Icon
            name="up"
            color={this.props.colorIcon || '#121212'}
            style={{
              elevation: 2,
              transform:[{rotate:'180deg'}],
              opacity: this.props.iconOpacity || 0.5,
              textAlign: 'center',
            }}
            size={this.props.size || 25}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
