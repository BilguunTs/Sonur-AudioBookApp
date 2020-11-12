import React from 'react';

import {D,MAIN} from  '../../configs'
import Animated ,{useAnimatedStyle, useSharedValue, useDerivedValue,withSpring,useAnimatedGestureHandler} from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
import FluidChapters from './FluidChapters';
import MainPlayer from './MainPlayer';
import Header from './Header'
import { withGlobalContext } from '../../context';

function AudioPlayer(props) {
  const expantion =useSharedValue(0)
  const drag=useSharedValue(0);
  const dWidth=useDerivedValue(()=>{
    if(drag.value<=0){
      return withSpring(D.WIDTH,MAIN.spring)
    }else{
      let fixed = D.WIDTH-drag.value
      if(fixed<D.WIDTH/4){
        fixed=D.WIDTH/4
      }
      return withSpring(fixed,MAIN.spring)
    }
  })
  const dleft =useDerivedValue(()=>{
    let center=dWidth.value/2;
    return withSpring(D.WIDTH/2-center,MAIN.spring) 
  })
  const dHeight =useDerivedValue(()=>{
    
    let fixed = expantion.value*D.HEIGHT/100
    console.log(fixed)
    return withSpring(fixed,MAIN.spring)
  })
  React.useEffect(()=>{
    if(props.global.stats){
      const {gplayer}=props.global.stats
      if(gplayer.isActive){
        expantion.value=withSpring(100,MAIN.spring);
      }else{
        expantion.value=withSpring(1,MAIN.spring);
      }
      
    }
  },[props.global.stats.gplayer.isActive])
  const styleContainer =useAnimatedStyle(()=>{
      return{
        
        position:"absolute",
        width:dWidth.value,
        left:dleft.value,
        height:dHeight.value,
        //transform:[{translateY:drag.value}],
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden',
        bottom:0,
        backgroundColor: '#fff',
      }
  })
  const handleGestureEvent=useAnimatedGestureHandler({
   onStart:()=>{
    console.log("duder")
   },
   onActive:(e)=>{
     console.log(e.translationY)
     let fixedVal= e.translationY*100/D.HEIGHT
      if(fixedVal<=0){fixedVal=0}
     return expantion.value= withSpring(fixedVal,MAIN.spring)
  //    if(e.translationY<0){
  //      return expantion.value=withSpring(0,MAIN.spring)
  //    }
  //  return expantion.value=withSpring(e.translationY,MAIN.spring)
   },
   onEnd:(e)=>{
    if (e.translationY<D.HEIGHT/3){
      expantion.value=withSpring(0,MAIN.spring)
    }else{
      expantion.value=withSpring(D.HEIGHT*0.8,MAIN.spring)

    }
   }
  })
 const toggleshrink = ()=>{
   if(drag.value===0){
     drag.value=withSpring(D.HEIGHT*0.8,MAIN.spring)
    }else{
      drag.value=withSpring(0,MAIN.spring)

   }
 }

  return (
    <Animated.View
      style={styleContainer}>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View style={{  position: 'absolute',
      top: 35,left:0,zIndex:3,width:'100%'}}>
       <Header leftAction={toggleshrink}/>  
          </Animated.View> 
        </PanGestureHandler>
      <MainPlayer filename="testaudio.mp3" />
      <FluidChapters />
    </Animated.View>
   
  );
}
export default withGlobalContext(AudioPlayer)