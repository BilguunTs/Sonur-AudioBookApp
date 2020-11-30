import React from 'react';
import {View ,Text}from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
const Star =({filled=false,size})=>{
    if(filled){
        return <Icon size={size} style={{marginHorizontal:1}} name="md-star" color="gold" />
    }
    return <Icon size={size} style={{marginHorizontal:1}} name="md-star" color="#eee"  />
}
const RatingStarts =({rate=0,size})=>{
    let rateAsIndex = rate-1
    return [1,2,3,4,5].map((_,i)=>{
       if (i<=rateAsIndex){
           return <Star key={i} filled size={size}/>
       } 
       return <Star key={i} size={size}/>
    })
}
const Rating =({rate=0,size=22,showText=true})=>{
  return <View>
      <View>
      {showText&&<Text style={{fontFamily:"Conforta",fontSize:20, textAlign:'center'}}>{rate}/5</Text>}
      <View style={{flexDirection:"row"}}>
          <RatingStarts rate={rate} size={size}/>
      </View>
      </View>
  </View>
}

export default Rating 