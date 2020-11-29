import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
//import {iOSUIKit} from 'react-native-typography'

export default class Settings extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={[style.header]}>
          <View style={[style.centered,style.flex1]}>
           <Text>тохиргоо</Text>
          </View>
        </View>
        <View style={[style.body]}>         
        </View>
      </View>
    );
  }
}

const style =StyleSheet.create({
container:{
  flex:1
},
test:{
 borderWidth:1
},
header:{
  flex:1,
  flexDirection:'row'
},
tabContainer:{
  flex:1,
}
,centered:{
  justifyContent:'center',
  alignItems:'center'
},
text:{
  fontFamily:"Conforta"
},
flex1:{
flex:1
},
avatar:{
  width: 100,
  height:100,
  borderRadius: 50,

   
},
avatarContainer:{
  width:"100%",
},
body:{flex:4},
footer:{flex:1}
})