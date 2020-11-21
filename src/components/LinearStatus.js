import React from 'react';
import {StyleSheet} from  'react-native'
import Animated, {useDerivedValue,withSpring,useAnimatedStyle} from 'react-native-reanimated'
import {MAIN} from '../configs' 
export default ({duration=0,current=0,showStatus=true})=>{
    const fixedValue =useDerivedValue(()=>{
      return withSpring(current*100/duration,MAIN.spring)
    })
    const animatedStyle=useAnimatedStyle(()=>{
        return{
        width:`${fixedValue.value}%`,
        height:'100%',
        position:"absolute",
        left:0,
        zIndex:2,
        backgroundColor:"orange",
        borderRadius:40
        }
    })
    return <Animated.View style={style.container}>
           <Animated.View style={[animatedStyle]}>
           {showStatus&&<Animated.Text style={style.status}>{current+"%"}</Animated.Text>}
           </Animated.View>
    </Animated.View>
}

const style=StyleSheet.create({
    container:{
         width:"100%",
         height:13,
         backgroundColor:"#eee",
         borderRadius:40,
    },
    status:{
        position:"absolute",
        textAlign:'center',
        width:"100%",
        fontFamily:"Conforta",
        fontSize:10,
        color:"#eee",
        lineHeight:13,
    }
})