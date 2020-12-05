import React from 'react'
import {View,Text} from 'react-native';
import {material} from 'react-native-typography';
import Animated from 'react-native-reanimated'
import BackButton from '../../components/BackButton'

export default ({isToggled,text,leftAction,hideleft=false})=>{
    return  <Animated.View
    style={{
      alignItems: 'center',
      flexDirection:"row",   
    }}>
        <View style={{flex:1,alignItems:'center'}}>
        { hideleft===false&&
           <View style={{maxHeight:40}}>
          <BackButton onPress={leftAction}/>
          </View>
        }
        </View>
        <View style={{flex:3,alignItems:'center',}}> 
        <Text numberOfLines={1} style={[material.headline,{fontFamily:"Conforta"}]}>{text||"Хоосон"}</Text>
        </View>
        <View style={{flex:1}}/>
  </Animated.View>
}