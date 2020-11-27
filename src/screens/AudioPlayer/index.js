import React from 'react';
import {View,StyleSheet}from 'react-native'
import {D,MAIN} from  '../../configs'
import Animated,{
  interpolate,
  Extrapolate
 } from 'react-native-reanimated'

import FluidChapters from './FluidChapters';
import MainPlayer from './MainPlayer';
import Header from './Header'
const CIRCLE_SIZE=MAIN.CIRCLE_SIZE
const AudioPlayer=({global,dragValue})=> {
  
  return (
  <View  style={{flex:1}}>
    <Animated.View style={StyleSheet.absoluteFill} >
<Animated.View style={{flex:1,justifyContent:'center'}}>
      <Header dragValue={dragValue} leftAction={()=>console.log("clicked due")}/>
    </Animated.View>
    <View style={{flex:3,justifyContent:'center'}}>
      <MainPlayer  filename="testaudio.mp3" />
    </View>
    <View style={{flex:1,alignItems:'center'}}>
      <FluidChapters />
      </View> 
    </Animated.View>
   </View>
  );
}
export default AudioPlayer