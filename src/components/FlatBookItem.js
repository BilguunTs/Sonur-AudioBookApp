import React from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {D, MAIN} from '../configs';
import {BoxShadow} from '../modules';
import PlayButton from './PlayButton';

import {numberWithCommas} from '../utils';
import Icon from 'react-native-vector-icons/Feather';

const Elevation = ({elevated, children}) => {
  if (elevated) {
    return <BoxShadow setting={MAIN.shadowOpt}>{children}</BoxShadow>;
  }
  return <>{children}</>;
};
const FlatBookItem = ({
  onPress,
  isLocked,
  title = '',
  author = '',
  img,
  margin = 0,
  width = 122,
  duration = 0,
  skewY = 0,
  about = '',
  elevated = true,
  price = 0,
}) => {
  const pressing = useSharedValue(false);
  const scale = useDerivedValue(() => {
    if (pressing.value) {
      return withSpring(0.9, {mass: 0.5});
    }
    return withSpring(1, {mass: 0.5});
  });

  //const Title=!contrast?iOSUIKit.title3Object:iOSUIKit.title3White
  //const FootNote=!contrast?iOSUIKit.footnote:iOSUIKit.footnoteWhite

  const handleNavigate = () => {
    onPress();
  };
  return (
    <Pressable
      android_ripple={{color: '#fff', radius: 30}}
      onPress={handleNavigate.bind(this)}
      onPressIn={() => (pressing.value = true)}
      onPressOut={() => (pressing.value = false)}>
      <Animated.View style={[styles.container]}>
        <View style={styles.left}>
          <View>
            <Elevation elevated={elevated}>
              <Pressable android_ripple onPress={onPress}>
                <Image
                  style={{margin, width, ...styles.stretch}}
                  source={{uri: img}}
                />
              </Pressable>
            </Elevation>
          </View>
        </View>
        <View style={[styles.right]}>
          <View style={[styles.top]}>
            <Text
              numberOfLines={2}
              style={[iOSUIKit.bodyEmphasizedObject, {fontFamily: 'Conforta'}]}>
              {title}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                iOSUIKit.footnoteObject,
                {fontFamily: 'Conforta', opacity: 0.7},
              ]}>
              {author}
            </Text>
          </View>
          <View style={[styles.body]}>
            <Text
              numberOfLines={5}
              style={[
                iOSUIKit.callout,
                {fontFamily: 'Conforta', opacity: 0.7},
              ]}>
              {about}
            </Text>
          </View>
          <View style={[styles.footer]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="clock"
                size={14}
                style={{opacity: 0.6, marginRight: 3}}
              />
              <Text
                numberOfLines={1}
                style={[
                  iOSUIKit.footnoteObject,
                  {fontFamily: 'Conforta', opacity: 0.7},
                ]}>
                {duration}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                numberOfLines={1}
                style={[
                  iOSUIKit.footnoteEmphasized,
                  {
                    fontFamily: 'Conforta',
                    opacity: 0.7,
                    color: !isLocked ? 'green' : '#212121',
                  },
                ]}>
                {isLocked ? `${numberWithCommas(price)}₮` : 'авсан'}
              </Text>
            </View>
          </View>
          {/* <BoxShadow setting={MAIN.shadow_Play_BTN}>
          <PlayButton colorBtn='#35cb6f' size={40}/>
          </BoxShadow> */}
          {/* <View style={{position:"absolute",right:0, height:'100%',width:30,justifyContent:'center'}}>
               <View style={{
                 borderWidth:0.3, 
                 height:40,width:40 ,
                 borderTopLeftRadius:10,
                 borderBottomLeftRadius:10
                 }}>
                  <Icon size={35} style={{opacity:0.6}} name="chevron-right"/>
                </View>               
          </View> */}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default FlatBookItem;
const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#dce1ea',
    backgroundColor: '#fff',
    borderColor: '#bababa',
    flexDirection: 'row',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
    minHeight: D.HEIGHT / 3,
  },
  left: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    padding: 5,
    flex: 1.5,
    alignItems: 'flex-start',
  },
  top: {flex: 1},
  body: {flex: 2},
  footer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  stretch: {
    height: MAIN.book.height,
    width: 122,
    overflow: 'hidden',
    borderRadius: 10,
    //zIndex: 20,
  },
});
