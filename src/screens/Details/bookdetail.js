import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import {D} from '../../configs';
import BookHeroCard from '../../components/BookHeroCard';
import {iOSUIKit} from 'react-native-typography';
//import ReadBtn from '../../components/ReviewIconBtn';
//import ReviewBtn from '../../components/ReadBookIconBtn';
//import ListenBtn from '../../components/ListenBookIconBtn';
//import PlayBtn from '../../components/PlayButton';
import Rating from '../../components/RatingStars';
import Icon from 'react-native-vector-icons/Feather';
import FloatingFooterActions from '../../components/FloatingFooterActions';
import {withGlobalContext} from '../../context';
import LinearGradient from 'react-native-linear-gradient';
export default withGlobalContext(({navigation, route, global}) => {
  const {isLocked, title, author, thumbnail, about} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={style.header}>
        <LinearGradient
          style={{width: D.WIDTH, padding: 10, zIndex: 3}}
          colors={['#fff', 'rgba(255, 255, 255, 0.1)']}>
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={{color: '#eee'}}
            style={style.backBtn}>
            <Icon name="arrow-left" size={30} />
          </Pressable>
        </LinearGradient>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <View style={style.body}>
          <View style={style.topSection}>
            <View style={style.thumbnailContainer}>
              <BookHeroCard disable img={thumbnail} />
            </View>
            <Text
              style={[iOSUIKit.title3, style.text, {fontSize: 23}]}
              numberOfLines={2}>
              {title}
            </Text>
            <Text style={(iOSUIKit.subhead, style.text)} numberOfLines={1}>
              {author}
            </Text>
          </View>
          <View style={style.midSection}>
            <View style={style.info}>
              <View style={[style.infoItem, style.center]}>
                <Rating rate={4} />
              </View>
              <View style={[style.infoItem, style.center]}>
                <Text style={style.text}>{'124 хуудас'}</Text>
              </View>
            </View>
            <View style={style.about}>
              <View style={style.topAction}>
                <Text style={[iOSUIKit.title3, style.text]}>Тухай</Text>
              </View>
              <Text style={[iOSUIKit.bodyObject, style.text]}>{about}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, width: D.WIDTH}}>
        <LinearGradient
          style={{width: '100%', alignItems: 'center'}}
          colors={['rgba(255, 255, 255, 0.3)', '#fff']}>
          <View style={{marginBottom: 10}}>
            <FloatingFooterActions
              navigation={navigation}
              item={route.params}
              global={global}
              type={isLocked ? 'purchase' : 'play'}
            />
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 200,
  },
  header: {
    width: D.WIDTH,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
  },
  backBtn: {
    maxWidth: 30,
  },
  text: {
    fontFamily: 'Conforta',
  },
  topAction: {
    marginVertical: 15,
  },
  body: {
    flex: 1,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  midSection: {},
  about: {
    marginBottom: 100,
  },
  info: {
    flexDirection: 'row',
  },
  infoItem: {
    flex: 1,
    minHeight: 50,
    marginVertical: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailContainer: {marginBottom: 10},
});
