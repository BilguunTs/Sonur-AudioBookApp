import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
} from 'react-native';

import {WrapTextContent} from '../../layout/withWrapper';
import BookHeroCard from '../../components/BookHeroCard';
import {iOSUIKit} from 'react-native-typography';
//import ReadBtn from '../../components/ReviewIconBtn';
//import ReviewBtn from '../../components/ReadBookIconBtn';
//import ListenBtn from '../../components/ListenBookIconBtn';
//import PlayBtn from '../../components/PlayButton';
import {withGlobalContext} from '../../context'

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
          <ScrollView style={{flex:1}}>
            <Text numberOfLines={5} style={[iOSUIKit.bodyObject,{fontFamily:"Conforta"}]}>slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                </Text>
          
          </ScrollView>
        </View>
      
    </SafeAreaView>
  );
});
