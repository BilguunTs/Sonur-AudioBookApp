import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet, Text,Pressable} from 'react-native';
import { material}  from 'react-native-typography'
import {numberWithCommas} from '../utils'
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
  width = MAIN.book.width,
  contrast,
  price=0,
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

  const Title=!contrast?material.body1:material.buttonWhite
  const FootNote=!contrast?material.caption:material.subheadingWhite
  if (animated){
   return <Pressable style={{width:MAIN.book.width}} android_ripple={{color:"#9088d494"}}
                     onPressIn={()=>pressing.value=true} 
                     onPressOut={()=>pressing.value=false} 
                     onPress={handleOnPress}>
          <Animated.View style={[styleImg]}>
          <BoxShadow setting={MAIN.shadowOpt}>
          <Image style={{margin, width, ...styles.stretch}}
                 source={{uri: img}}/>
          </BoxShadow>
    </Animated.View>
    {!disable && (
      <View>
        <View style={{ flex:2 }}>
        <Text numberOfLines={2} style={{...Title,fontFamily:"Conforta"}}>{title}</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text numberOfLines={1} style={[FootNote,{fontFamily:'Conforta',opacity:0.7}]}>{author}</Text>
        <Text numberOfLines={1} style={[material.caption,{fontFamily:'Conforta',opacity:0.7}]}>{numberWithCommas(price)}₮</Text>
        </View>
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
    width: MAIN.book.width,
    overflow: 'hidden', 
    borderRadius: 10,    
    //zIndex: 20,
    
  },
});
