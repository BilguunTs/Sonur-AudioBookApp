import React from 'react'
import {View,Text} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import Animated ,{useAnimatedStyle} from 'react-native-reanimated'
import BackButton from '../../components/BackButton'
export default ({text,leftAction})=>{
    return <View
    style={{
      alignItems: 'center',
      flexDirection:"row",    
    }}>
        <View style={{flex:1,alignItems:'center'}}>

    <BackButton onPress={leftAction}/>
        </View>
        <View style={{flex:3,alignItems:'center'}}>

    <Text numberOfLines={1} style={[iOSUIKit.largeTitleEmphasized]}>{text||"no title"}</Text>
        </View>
        <View style={{flex:1}}>

        </View>
  </View>
}