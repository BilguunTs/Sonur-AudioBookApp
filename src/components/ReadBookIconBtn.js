import React, { Component } from 'react'
import { TouchableOpacity,Text,View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {iOSUIKit} from 'react-native-typography'
export default class ReadBookIconBtn extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} {...this.props}>
                
                <View style={{flex:1,justifyContent:'center'}}> 

                <Icon name='md-book' style={{opacity:0.5,textAlign: 'center'}} size={this.props.size||30}/>
                 <Text style={iOSUIKit.subhead}>Унших</Text>
                </View>
                
            </TouchableOpacity>
        )
    }
}
