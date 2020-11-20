import React from 'react';
import Animated ,{withSpring,useAnimatedStyle,useAnimatedGestureHandler,useSharedValue, useDerivedValue, withTiming}from 'react-native-reanimated'
import {TapGestureHandler} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MAIN,D}from '../../configs'
const ACTION_BTN_SIZE=MAIN.CIRCLE_SIZE*0.7;
const TOP_OFFSET = (D.HEIGHT*0.8)/2-ACTION_BTN_SIZE
const ActionButton =({onPress=function(){},direction="left",text=""})=>{
      
  const pressing=useSharedValue(false)
    const scale = useDerivedValue(()=>{
        if(pressing.value)return withSpring(0.9,MAIN.spring)
        return withSpring(1,MAIN.spring)
    })
    const opacity = useDerivedValue(()=>{
        if(pressing.value){
            return withSpring(0.3,MAIN.spring)
        }
        return withSpring(1,MAIN.spring)
    })
    const styleBotton =useAnimatedStyle(()=>{
      return {
        position:"absolute",
        justifyContent: 'center',
        alignItems:'center',
        transform:[{scale:scale.value}],
        height:ACTION_BTN_SIZE,
        width:ACTION_BTN_SIZE,
        borderRadius:ACTION_BTN_SIZE,
        
        top:TOP_OFFSET,
        left : direction==="left"?0:D.WIDTH-ACTION_BTN_SIZE,
        opacity:opacity.value
    }
    })
    const styleText= useAnimatedStyle(()=>{
      return {  position: 'absolute',
      alignSelf: 'center',
      marginTop: 1,
      color: '#333',
      fontSize: 12,}
    })
    const handleEvent=useAnimatedGestureHandler({
      onStart:()=>{pressing.value=true},
      onActive:()=>{onPress()},
    onFinish:()=>{pressing.value=false},
    onEnd:()=>{pressing.value=false}
    })
    
  
    return <TapGestureHandler  onGestureEvent={handleEvent}>
     <Animated.View
    style={[styleBotton,{}]}>
    <Icon style={{opacity:0.5}} name={direction==='left'?"replay-10":"forward-10"} size={30} style={{width: 30, height: 30}} />
   {text!==''&& <Animated.Text
      numberOfLines={1}
      style={[styleText]}>
      {text}
    </Animated.Text>}
      </Animated.View>
    </TapGestureHandler>
  }

export default ActionButton