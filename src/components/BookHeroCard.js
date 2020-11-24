import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet, Text,Pressable} from 'react-native';
import { iOSUIKit } from 'react-native-typography'
import Animated,{
       useSharedValue,
       useAnimatedStyle,
       useDerivedValue,
       withSpring} from 'react-native-reanimated'
import {MAIN} from '../configs'
import {BoxShadow} from '../modules'
const BookHeroCard = ({
  onPress,
  title = '',
  author = '',
  img,
  margin = 0,
  disable = false,
  width = 122,
  contrast,
  animated=false,
}) => {
  const pressing = useSharedValue(false);
  const scale =useDerivedValue(()=>{
    if(pressing.value){
      return withSpring(0.9)
    }
    return withSpring(1)
  })
  const styleImg = useAnimatedStyle(()=>{
    return{
      transform:[{scale:scale.value}]
    }
  })
  const handleOnPress =()=>{
    if(animated){
      pressing.value=true;
    }
    onPress()
  }
  const Title=!contrast?iOSUIKit.title3:iOSUIKit.title3White
  const FootNote=!contrast?iOSUIKit.footnote:iOSUIKit.footnoteWhite
  if (animated){
   return <Pressable style={{maxWidth:122}} android_ripple={{color:"#9088d494"}} onPressIn={()=>pressing.value=true} 
                     onPressOut={()=>pressing.value=false} 
                     onPress={handleOnPress}>
     <Animated.View style={[styleImg]}>
    <BoxShadow setting={MAIN.shadowOpt}>
    <Image
      style={{margin, width, ...styles.stretch}}
      source={{uri: img}}
      />
      </BoxShadow>
    </Animated.View>
    {!disable && (
      <View>
        <Text numberOfLines={2} lineBreakMode='tail' style={{fontFamily:"Conforta",...Title}}>{title}</Text>
        <Text numberOfLines={1} style={[FootNote,{fontFamily:'Conforta',opacity:0.5}]}>{author}</Text>
      </View>
    )}
   </Pressable>  
  }
  return (
    
    <TouchableOpacity  disabled={disable} onPress={handleOnPress}>
      <BoxShadow setting={MAIN.shadowOpt}>
      <Image
        style={{margin, width, ...styles.stretch}}
        source={{uri: img}}
      />
        </BoxShadow>
      {!disable && (
        <View>
          <Text numberOfLines={1} style={{fontFamily:"Conforta",...Title}}>{title}</Text>
          <Text numberOfLines={1} style={[FootNote,{fontFamily:'Conforta'}]}>{author}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BookHeroCard;
const styles = StyleSheet.create({
  stretch: {
    height: MAIN.book.height,
    width: 122,
    overflow: 'hidden', 
    borderRadius: 10,    
    //zIndex: 20,
    
  },
});
