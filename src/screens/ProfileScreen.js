import React, {Component} from 'react';
import {Text, View,StyleSheet,Image} from 'react-native';
import {iOSUIKit} from 'react-native-typography'
const URI="https://image.freepik.com/free-vector/cute-girl-gaming-holding-joystick-cartoon-icon-illustration-people-technology-icon-concept-isolated-flat-cartoon-style_138676-2169.jpg"
export default class Profile extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={[style.header]}>
          <View style={[style.centered,style.flex1]}>
            <Text style={[iOSUIKit.title3]}>10</Text>
            <Text style={[style.text]}>дуусгасан</Text>
          </View>
          <View style={[style.centered,style.flex1]}>
            <View style={style.avatarContainer}>
            <Image style={[style.avatar]} source={{uri:URI}}/>
            </View>
          </View>
          <View style={[style.centered,style.flex1]}>
            <Text style={[iOSUIKit.title3]}>3</Text>
            <Text style={[style.text]}>уншиж байгаа</Text>
          </View>
        </View>
        <View style={[style.body]}>
          <View style={[style.centered,{marginVertical:3}]}>
            <Text numberOfLines={1} style={[iOSUIKit.title3,style.text,{fontSize:25,lineHeight:32}]}>Bill bilguun</Text>
          </View>
          <View style={[style.nowReading]}></View>
        </View>
        <View style={[style.footer]}></View>
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
centered:{
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
   height:"100%",
   width:"100%",
   resizeMode:'contain'
   
},
avatarContainer:{
  width:"100%",
},
body:{flex:2},
footer:{flex:1}
})