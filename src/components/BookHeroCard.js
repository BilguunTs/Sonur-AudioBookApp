import React from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {material} from 'react-native-typography';
import {numberWithCommas} from '../utils';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {MAIN, color} from '../configs';
import {BoxShadow} from '../modules';
const BookHeroCard = ({
  onPress = function () {},
  isLocked = true,
  title = '',
  author = '',
  img,
  margin = 0,
  disable = false,
  width = MAIN.book.width,
  contrast,
  price = 0,
  animated = false,
}) => {
  const pressing = useSharedValue(false);
  const scale = useDerivedValue(() => {
    if (pressing.value) {
      return withSpring(0.95, {mass: 0.3});
    }
    return withSpring(1, {mass: 0.3});
  });
  const styleImg = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });
  const handleOnPress = () => {
    if (animated) {
      pressing.value = true;
    }
    onPress();
  };

  const Title = !contrast ? material.body1 : material.buttonWhite;
  const FootNote = !contrast ? material.caption : material.subheadingWhite;
  if (animated) {
    return (
      <Pressable
        style={{width: MAIN.book.width}}
        android_ripple={{color: color.ripple}}
        onPressIn={() => (pressing.value = true)}
        onPressOut={() => (pressing.value = false)}
        onPress={handleOnPress}>
        <Animated.View style={[styleImg]}>
          <BoxShadow setting={MAIN.shadowOpt}>
            <Image
              style={{margin, width, ...styles.stretch}}
              source={{uri: img}}
            />
          </BoxShadow>
        </Animated.View>
        {!disable && (
          <View style={{height: 60}}>
            <View style={{flex: 1, marginBottom: 5, alignItems: 'center'}}>
              <Text
                numberOfLines={2}
                style={{...Title, fontFamily: 'Conforta', textAlign: 'center'}}>
                {title}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={[FootNote, {fontFamily: 'Conforta', opacity: 0.7}]}>
                {author}
              </Text>
              {isLocked && (
                <Text
                  numberOfLines={1}
                  style={[
                    material.caption,
                    {fontFamily: 'Conforta', opacity: 0.7},
                  ]}>
                  {numberWithCommas(price)}₮
                </Text>
              )}
              {!isLocked && (
                <Text
                  numberOfLines={1}
                  style={[
                    material.caption,
                    {
                      fontFamily: 'Conforta',
                      color: 'green',
                    },
                  ]}>
                  авсан
                </Text>
              )}
            </View>
          </View>
        )}
      </Pressable>
    );
  }
  return (
    <TouchableOpacity disabled={disable} onPress={handleOnPress}>
      <BoxShadow setting={MAIN.shadowOpt}>
        <Image style={{margin, width, ...styles.stretch}} source={{uri: img}} />
      </BoxShadow>
      {!disable && (
        <View>
          <Text numberOfLines={1} style={{fontFamily: 'Conforta', ...Title}}>
            {title}
          </Text>
          <Text numberOfLines={1} style={[FootNote, {fontFamily: 'Conforta'}]}>
            {author}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BookHeroCard;
const styles = StyleSheet.create({
  stretch: {
    height: MAIN.book.height,
    width: MAIN.book.width,
    overflow: 'hidden',
    borderRadius: 10,
    //zIndex: 20,
  },
});
