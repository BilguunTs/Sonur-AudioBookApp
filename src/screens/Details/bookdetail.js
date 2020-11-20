import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
} from 'react-native';

import {D} from '../../configs'
import BookHeroCard from '../../components/BookHeroCard';
import {iOSUIKit} from 'react-native-typography';
//import ReadBtn from '../../components/ReviewIconBtn';
//import ReviewBtn from '../../components/ReadBookIconBtn';
//import ListenBtn from '../../components/ListenBookIconBtn';
//import PlayBtn from '../../components/PlayButton';
import FloatingFooterActions from '../../components/FloatingFooterActions'
import {withGlobalContext} from '../../context'
import LinearGradient from 'react-native-linear-gradient';
export default withGlobalContext(({navigation, route,global}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const {title, author, thumbnail} = route.params;

  const handleOnPlay=()=>{
    global.methods.setGplayer(route.params)
  }
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#fff'}}>  
          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
        <View
          style={{
            flex:1,
            padding: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flex:1,
              alignItems: 'center',
              justifyContent:"center"
            }}>
              <View style={{marginBottom:10}}>
            <BookHeroCard disable img={thumbnail?.src} />          
              </View>
              <Text style={[iOSUIKit.title3,{fontFamily:'Conforta',fontSize:23}]} numberOfLines={2}>{title}</Text>
              <Text style={iOSUIKit.subhead,{fontFamily:"Conforta"}} numberOfLines={1}>{author}</Text>
          </View>
            <Text style={[iOSUIKit.bodyObject,{fontFamily:"Conforta"}]}>slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                </Text>
        </View>
            </ScrollView>
            <View style={{position:'absolute',
            bottom:0,
            width:D.WIDTH,}}>
            <LinearGradient style={{width:"100%",alignItems:'center' }} colors={['rgba(255, 255, 255, 0.5)', '#f6f6f6', '#fff']}> 
              <View style={{marginBottom:10}}>
              <FloatingFooterActions/>
              </View>
            </LinearGradient>
            </View>

    </SafeAreaView>
  );
});
