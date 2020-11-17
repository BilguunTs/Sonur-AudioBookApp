import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { iOSUIKit } from 'react-native-typography'
import Animated from 'react-native-reanimated'
import {D, MAIN} from '../configs'
import {BoxShadow} from '../modules'
import PlayButton from './PlayButton'
import Icon from 'react-native-vector-icons/Feather'
const FlatBookItem = ({
  onPress,
  title = '',
  author = '',
  img,
  margin = 0,
  width = 122,
  contrast,
  duration=0,
  skewY=0,
}) => {
  const Title=!contrast?iOSUIKit.title3Object:iOSUIKit.title3White
const FootNote=!contrast?iOSUIKit.footnote:iOSUIKit.footnoteWhite

return (
    
    <>
      <Animated.View style={[styles.container,{transform:[{skewY:`${skewY}deg`}]}]}>
        <View style={styles.left}>
      <BoxShadow setting={MAIN.shadowOpt}>
      <TouchableOpacity  onPress={onPress}>
      <Image
        style={{margin, width, ...styles.stretch}}
        source={{uri: img}}
        />
        </TouchableOpacity>
        </BoxShadow>
        </View>
        <View
          style={[styles.right]}>
          <Text numberOfLines={2} style={[iOSUIKit.bodyEmphasizedObject,{fontFamily:"Conforta"}]}>{title}</Text>
          <Text numberOfLines={1} style={[iOSUIKit.footnoteObject,{fontFamily:'Conforta',opacity:0.7}]}>{author}</Text>
          <BoxShadow setting={MAIN.shadow_Play_BTN}>
          <PlayButton colorBtn='#35cb6f' size={40}/>
          </BoxShadow>
          <Text numberOfLines={1} style={[iOSUIKit.footnoteObject,{fontFamily:'Conforta',opacity:0.7}]}>{duration}</Text>
          <View style={{position:"absolute",right:0, height:'100%',width:30,justifyContent:'center'}}>
               <View style={{borderWidth:0.3, height:40,width:40 ,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                  <Icon size={35} style={{opacity:0.6}} name="chevron-right"/>
                </View>               
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default FlatBookItem;
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#dce1ea',
    borderColor:"#bababa",
    borderWidth:1,
    flexDirection:'row',
    padding:5,
    marginVertical:3,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
  },
  left:{
    flex:1,
    alignItems:"center"
  },
  right:{
    padding:5,
    flex:1.5,
    alignItems:"center"
},
  stretch: {
    height:MAIN.book.height,
    width: 122,
    overflow: 'hidden',
    borderRadius:10,    
    //zIndex: 20,
    
  },
});
