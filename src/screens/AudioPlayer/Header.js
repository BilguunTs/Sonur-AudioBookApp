import React from 'react'
import {View,Text} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import Animated ,{useAnimatedStyle,useAnimatedGestureHandler} from 'react-native-reanimated'
import BackButton from '../../components/BackButton'
import {PanGestureHandler} from 'react-native-gesture-handler'
export default ({text,dragValue,leftAction,hideleft=false})=>{
  const handleEvent=useAnimatedGestureHandler({
    onStart:(_,c)=>{
      c.startY=dragValue.value
    },
    onActive:(e,ctx)=>{
      dragValue.value=ctx.startY+e.translationY
    }
  })
    return   <PanGestureHandler onGestureEvent={handleEvent}>
    <Animated.View
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
  </PanGestureHandler>
}