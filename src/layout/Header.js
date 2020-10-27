import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {iOSUIKit} from 'react-native-typography'
const WIDTH= Dimensions.get("window").width
export default class Header extends Component {
    renderLeftAction=()=>{
        const {type,contrast}=this.props
        if(type==='back'){
            return <TouchableOpacity>
            <Ionicons name="md-arrow-back" style={{color:!contrast?"#121212":"#fff"}} size={35}/>
        </TouchableOpacity>
        }
        return<TouchableOpacity>
        <Ionicons name="md-menu" size={35}  style={{color:!contrast?"#121212":"#fff"}}/>
    </TouchableOpacity>
    }
    render() {
        
        const{contrast=false,...rest}=this.props
        return (
            <View {...rest} style={{justifyContent:'space-between',flexDirection:"row", alignItems:'center',flexGrow:1, width:WIDTH,zIndex:10,position:'absolute' ,top:0,padding:20}}>
        {this.props.title&&<Text style={!contrast?iOSUIKit.title3:iOSUIKit.title3White}>{this.props.title}</Text>}
               {this.renderLeftAction()}
            </View>
        )
    }
}
