import React from 'react';
import Animated,{
    useSharedValue,
    useAnimatedProps,
    useAnimatedGestureHandler,
    withSpring,
}from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Circle} from 'react-native-svg'
const AnimatedCircle =Animated.createAnimatedComponent(Circle)
const FluidSun =()=>{
    const startingPosition =200
    const pressed =useSharedValue(false);
    const x =useSharedValue(startingPosition)
    const y =useSharedValue(startingPosition)
    const styleCirlce =useAnimatedProps(()=>{
        return {
         cx:x.value,
         cy:100
        }
    })
    const handleGestureEvent=useAnimatedGestureHandler({
         onStart:(_,c)=>{
             pressed.value=true
             c.startX=x.value
             c.startY=y.value
         },
         onActive:(e,c)=>{
             x.value=withSpring(c.startX+ e.translationX)
             y.value=withSpring(c.startY+ e.translationY)
         },
        //  onEnd:(e,c)=>{
        //      pressed.value=false;
        //      x.value=withSpring(startingPosition)
        //      y.value=withSpring(startingPosition)
        //  }
    })
    return  <PanGestureHandler onGestureEvent={handleGestureEvent}> 

    <AnimatedCircle
    animatedProps={styleCirlce}
    r={50.391}
    fill="#faedcb"
    //transform="matrix(.1496 -.01847 .01853 .15008 175.45 28.83)"
    data-name="Layer 2"
    
  />
  </PanGestureHandler>
}
export default FluidSun