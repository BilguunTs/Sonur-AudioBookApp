import React from 'react'
import {View,Text} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import Animated ,{useAnimatedGestureHandler} from 'react-native-reanimated'
import BackButton from '../../components/BackButton'
import {PanGestureHandler} from 'react-native-gesture-handler'
export default ({text,leftAction,hideleft=false})=>{
  
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
        <Text numberOfLines={1} style={[iOSUIKit.largeTitleEmphasized]}>{text||"no title"}</Text>
        </View>
        <View style={{flex:1}}>

        </View>
  </Animated.View>
}