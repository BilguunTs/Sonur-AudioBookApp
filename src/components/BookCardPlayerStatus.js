import React from 'react';
import {Image, View,StyleSheet, Text,Pressable} from 'react-native';
import { iOSUIKit } from 'react-native-typography'
import Animated,{
  useSharedValue,
 useDerivedValue,
 withSpring,
 useAnimatedStyle
} from 'react-native-reanimated'
import {D, MAIN} from '../configs'
import {BoxShadow} from '../modules'
import PlayButton from './PlayButton'
import StatusBar from  './LinearStatus'
import {numberWithCommas} from '../utils'
import Icon from 'react-native-vector-icons/Feather'
const BookWithPlayerStatus = ({
  onPress,
  title = '',
  author = '',
  img,
  margin = 0,
  width = 122,
  duration=0,
  about="",
  price=0,
}) => {
  const pressing = useSharedValue(false)
  const scale = useDerivedValue(()=>{
    if(pressing.value){

      return withSpring(0.9,{mass:0.5})
    }
    return withSpring(1,{mass:0.5})
  })

  //const Title=!contrast?iOSUIKit.title3Object:iOSUIKit.title3White
//const FootNote=!contrast?iOSUIKit.footnote:iOSUIKit.footnoteWhite

const styleCont=useAnimatedStyle(()=>{
  return{
    transform:[{scale:scale.value}]
  }
})
const handleNavigate=()=>{onPress()}
const handleLongPress= ()=>{}
return (
    <Pressable  
    onLongPress={handleLongPress}
    android_ripple={{color:"#fff",radius:30}} 
    onPress={handleNavigate.bind(this)} 
    onPressIn={()=>pressing.value=true}
    onPressOut={()=>pressing.value=false}>
      <Animated.View style={[styleCont,styles.container]}>
        <View style={styles.left}>
          <BoxShadow setting={MAIN.shadowOpt}>
      <Pressable android_ripple onPress={onPress}>
      <Image
        style={{margin, width, ...styles.stretch}}
        source={{uri: img}}
        />
        </Pressable>
        </BoxShadow>
        </View>
        <View
          style={[styles.right]}>
            <View style={[styles.top]}>
          <Text numberOfLines={2} style={[iOSUIKit.bodyEmphasizedObject,{fontFamily:"Conforta"}]}>{title}</Text>
          <Text numberOfLines={1} style={[iOSUIKit.footnoteObject,{fontFamily:'Conforta',opacity:0.7}]}>{author}</Text>
            </View>
            <View style={[styles.body]}>
            <BoxShadow setting={MAIN.shadow_Play_BTN}>
          <PlayButton colorBtn='#9088d4' size={40}/>
          </BoxShadow> 
          </View>
            <View style={[styles.footer]}>
            <StatusBar duration={100} current={30}/>
              <View style={{flexDirection:"row",alignItems:'center'}}>
                <Icon name='clock' size={14} style={{opacity:0.6,marginRight:3}}/>
         <Text numberOfLines={1} style={[iOSUIKit.footnoteObject,{fontFamily:'Conforta',opacity:0.7}]}>{duration}</Text>
              </View>
         </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default BookWithPlayerStatus
const styles = StyleSheet.create({
  container:{
   // backgroundColor:'#dce1ea',
    backgroundColor:'#fff',
    borderColor:"#bababa",
    flexDirection:'row',
    padding:5,
    marginVertical:5,
    borderRadius:10,
    minHeight:D.HEIGHT/3
  },
  left:{
    flex:1,
    alignItems:"center"
  },
  right:{
    padding:5,
    flex:1.5,
    alignItems:'flex-start'
  },
  top:{flex:1},
  body:{flex:2, width:'100%', justifyContent:"center",alignItems:'center'},
  footer:{
    flex:1,

    width:"100%",
    justifyContent:"space-between"
  },
  stretch: {
    height:MAIN.book.height,
    width: 122,
    overflow: 'hidden',
    borderRadius:10,    
    //zIndex: 20,
    
  },
});
