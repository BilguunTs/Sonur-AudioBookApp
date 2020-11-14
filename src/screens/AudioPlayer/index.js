import React from 'react';

import {D,MAIN} from  '../../configs'
import Animated ,{useAnimatedStyle,
  useSharedValue, 
  useDerivedValue,withSpring,useAnimatedGestureHandler, withTiming} from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
import FluidChapters from './FluidChapters';
import MainPlayer from './MainPlayer';
import Header from './Header'
import { withGlobalContext } from '../../context';

const CIRCLE_SIZE=MAIN.CIRCLE_SIZE
function AudioPlayer(props) {
  const expantion =useSharedValue(false)
  const drag=useDerivedValue(()=>{
    if(expantion.value){
      return withSpring( 0,MAIN.spring)
    }else{
      return withSpring( D.HEIGHT,MAIN.spring)
    }
  });
  const circleY= useDerivedValue(()=>{
    if(drag.value>=D.HEIGHT*0.95-CIRCLE_SIZE){
      return withSpring(D.HEIGHT*0.95-CIRCLE_SIZE,MAIN.spring)
    }
    return  withSpring(drag.value,MAIN.spring)
  })
  const dWidth=useDerivedValue(()=>{
    if(drag.value<=0){
      return withSpring(D.WIDTH,MAIN.spring)
    }else {

      let fixed = D.WIDTH-drag.value
      if(fixed<D.WIDTH/4){
        fixed=D.WIDTH/4
      }
      return withSpring(fixed,MAIN.spring)
    }
  })
  const dHeight = useDerivedValue(()=>{
    
    
    return withSpring(D.HEIGHT*0.95-(drag.value+CIRCLE_SIZE),MAIN.spring)
    
  })
  const dleft =useDerivedValue(()=>{
    let center=dWidth.value/2;
    return withSpring(D.WIDTH/2-center,MAIN.spring) 
  })
  const dBorderRadius = useDerivedValue(()=>{ 
      return withSpring(drag.value*D.WIDTH/(D.WIDTH/3) ,MAIN.spring)
  })
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
  const dBottom = useDerivedValue(()=>{
    // if(dWidth.value>D.WIDTH/3){
    //   return withSpring(0,MAIN.spring)
    // }
    let fixedVal = drag.value*10/D.HEIGHT
    return withSpring(fixedVal,MAIN.spring)
    
  })
  const dOpacity = useDerivedValue(()=>{
    let dv=dWidth.value<0?1:drag.value
    let fxV =1-dv/D.WIDTH
    if(fxV<=0.3){
      fxV=0
    }  
    return withSpring(fxV,MAIN.spring)
  })
  const styleContainer =useAnimatedStyle(()=>{
      return{
        position:"absolute",
        width:dWidth.value,
       // left:dleft.value,
        height:dHeight.value,
      transform:[{translateX:-dleft.value}],
        justifyContent: 'center',
       // borderTopRightRadius:dBorderRadius.value,
       // borderBottomRightRadius:dBorderRadius.value,
        alignItems: 'center',
        overflow:'hidden',
        bottom:dBottom.value,
        backgroundColor: '#fff',
      }
  })
  const circleWidth =useDerivedValue(()=>{

    return withSpring(dWidth.value,MAIN.spring)
  })
  const circleX  =useDerivedValue(()=>{
    if(circleWidth===D.WIDTH){
      return withSpring (D.WIDTH/2,MAIN.spring)
    }
    return withSpring(0,MAIN.spring)
  })
  const styleWrapper  =useAnimatedStyle(()=>{
    return{
      opacity:dOpacity.value,
      flex:1,
      width:D.WIDTH,
      //height:D.HEIGHT,
      alignItems:'center',
      zIndex:2
    }
  })
  const styleDragCircle =useAnimatedStyle(()=>{
    return {
      position:'absolute',
      width:circleWidth.value,
      height:CIRCLE_SIZE,
      transform:[{translateX:-circleX.value},{translateY:circleY.value}],
      borderWidth:1,
      top:0,
      zIndex:3,     
      borderTopRightRadius: D.HEIGHT*0.85,
      borderBottomRightRadius:D.HEIGHT*0.85,
      backgroundColor:"#eee"
    }
  })
  const styleIcon =useAnimatedStyle(()=>{
    let badgeSize = CIRCLE_SIZE*0.6
    return{
      height:badgeSize,
      width:badgeSize,
      borderRadius:badgeSize,
      backgroundColor:"green",
      position:'absolute',
      top:CIRCLE_SIZE/2-badgeSize/2,
      right:CIRCLE_SIZE/2-badgeSize/2
    }
  })
  const styleHeader = useAnimatedStyle(()=>{
    return{ 
      zIndex:4,
      transform:[{translateX:-dleft.value}]
    }
  })
  const handleGestureEvent=useAnimatedGestureHandler({
   onStart:()=>{
    
   },
   onActive:(e)=>{
    //  if(e.translationY<0){
    //    return drag.value=withSpring(0,MAIN.spring)
    //  }
    let fixedY=e.translationY;
    if(fixedY<=0){
      fixedY=1;
    }
    return drag.value=withSpring(fixedY,MAIN.spring)
   //return drag.value=withSpring(e.translationY,MAIN.spring)
   },
   onEnd:(e)=>{
    if (e.translationY<D.HEIGHT/3){
      drag.value=withSpring(0,MAIN.spring)
    }else{
      drag.value=withSpring(D.HEIGHT*0.85,MAIN.spring)

    }
   }
  })
 const toggleshrink = ()=>{
   if(drag.value===0){
     drag.value=withSpring(D.HEIGHT*0.85,MAIN.spring)
    }else{
      drag.value=withSpring(0,MAIN.spring)

   }
 }

  return (<>
    <PanGestureHandler onGestureEvent={handleGestureEvent}>

    <Animated.View style={[styleDragCircle]}>
      <Animated.View style={[styleHeader]}>
    <Header leftAction={toggleshrink}/>  
      </Animated.View>
      <Animated.View style={[styleIcon]}/>
      </Animated.View>
    </PanGestureHandler>
    <Animated.View
    style={styleContainer}>
        <Animated.View style={[styleWrapper]}>
      <MainPlayer filename="testaudio.mp3" />
      <FluidChapters /> 
        </Animated.View>
    </Animated.View>
   </>
  );
}
export default withGlobalContext(AudioPlayer)