import React from 'react';

import {D,MAIN} from  '../../configs'
import Animated ,{useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import FluidChapters from './FluidChapters';
import MainPlayer from './MainPlayer';
import Header from './Header'
import { withGlobalContext } from '../../context';

function AudioPlayer(props) {
  const expantion =useSharedValue(0)
  React.useEffect(()=>{
    if(props.global.stats){
      const {gplayer}=props.global.stats
      gplayer.isVisible?expantion.value=100:expantion.value=0;
      
    }
  },[props.global.stats.gplayer])
  const styleContainer =useAnimatedStyle(()=>{
      return{
        flex: 1,
        position:"absolute",
        width:D.WIDTH,
        height:withSpring(expantion.value,MAIN.spring),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }
  })
  
  return (
    <Animated.View
      style={styleContainer}>
      <Header/>
      <MainPlayer filename="testaudio.mp3" />
      <FluidChapters />
    </Animated.View>
  );
}
export default withGlobalContext(AudioPlayer)