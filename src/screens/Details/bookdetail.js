import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  Text,
} from 'react-native';

import {WrapTextContent} from '../../layout/withWrapper';
import BookHeroCard from '../../components/BookHeroCard';
import {iOSUIKit} from 'react-native-typography';
import ReadBtn from '../../components/ReviewIconBtn';
import ReviewBtn from '../../components/ReadBookIconBtn';
import ListenBtn from '../../components/ListenBookIconBtn';
import PlayBtn from '../../components/PlayButton';

const WIDTH = Dimensions.get('window').width;
export default ({navigation, route}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const {title, author, thumbnail} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        resizeMode="cover"
        source={{uri: thumbnail?.src}}
        blurRadius={5}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View>
            <BookHeroCard disable img={thumbnail?.src} />
          </View>
          <View>
            <PlayBtn
              onPress={() => {
                navigation.navigate('Gplayer', {title, thumbnail});
              }}
              colorIcon={'#fff'}
              colorBtn={'#4edeaa'}
              iconOpacity={1}
              size={40}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 15,
            flex: 2,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={iOSUIKit.largeTitleEmphasized}>{title}</Text>
              <Text style={iOSUIKit.title3}>{author}</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#eee',
              borderBottomWidth: 1,
              marginTop: 2,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <ReviewBtn size={35} />
            <ListenBtn size={35} />
            <ReadBtn size={35} />
          </View>
          <View
            style={{
              borderBottomColor: '#eee',
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />

          <ScrollView>
            <View style={{marginVertical: 15}}>
              <Text style={iOSUIKit.subheadEmphasized}>Өмнөх үг</Text>
              <WrapTextContent style={{marginTop: 5}}>
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
                slakdfjlkasdjflkajsdlfkjalksdfjlkasjdflksadjlfjlksdajflk
              </WrapTextContent>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
