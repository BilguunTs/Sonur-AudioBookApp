import React from 'react';

import {D,MAIN} from  '../../configs'
import Animated ,{
  useAnimatedStyle,
  useSharedValue, 
} from 'react-native-reanimated'

import FluidChapters from './FluidChapters';
import MainPlayer from './MainPlayer';

import { withGlobalContext } from '../../context';

const CIRCLE_SIZE=MAIN.CIRCLE_SIZE
function AudioPlayer(props) {
  const expantion =useSharedValue(false)

  React.useEffect(()=>{
    if(props.global.stats){
      const {gplayer}=props.global.stats
      if(gplayer.isActive){
        expantion.value=true;
      }else{
        expantion.value=false;
      }
      
    }
  },[props.global.stats.gplayer.isActive])
  

  return (<Animated.View  style={{position:'absolute',width:D.WIDTH,height:D.HEIGHT}}>
      <MainPlayer filename="testaudio.mp3" />
      <FluidChapters /> 
   </Animated.View>
  );
}
export default withGlobalContext(AudioPlayer)