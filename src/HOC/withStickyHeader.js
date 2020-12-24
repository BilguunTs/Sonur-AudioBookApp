import React, {useRef} from 'react';
import {SafeAreaView, Text, View, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {material} from 'react-native-typography';
import {MAIN, color, D} from '../configs';
import Header from '../layout/Header';
import {BackWrapper} from '../components/BackWrapper';
import SonurFox from '../svg/sonurfox.svg';
import {withGlobalContext} from '../context';
//import SonurLogo from '../svg/logowithletter.svg';
const UserStats = withGlobalContext(({global}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      android_ripple={{color: color.ripple, borderless: true}}
      onPress={() => navigation.navigate('Profile')}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: 5,
        }}>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: global.isOnline ? '#90ee90' : 'lightgray',
            borderRadius: 4,
            marginHorizontal: 3,
          }}
        />
        <Text style={[material.caption, {fontFamily: 'Conforta'}]}>
          {global.isOnline ? 'Онлайн' : 'Офлайн'}
        </Text>
      </View>
      <Text style={[material.headline, {fontFamily: 'Conforta'}]}>Сайн уу</Text>
      <Text style={[material.body2, {fontFamily: 'Conforta'}]}>
        {global.user?.email}
      </Text>
    </Pressable>
  );
});

const ScrollContainer = ({children, headerType}) => {
  const isScrolling = useSharedValue(false);
  const transY = useSharedValue(0);
  const scrollRef = useRef();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      transY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      isScrolling.value = true;
    },
    onEndDrag: (e) => {
      isScrolling.value = false;
    },
  });
  const getHeader = () => {
    if (headerType === MAIN.HEADER.WITH.SEARCH) {
      return (
        <Header
          transY={transY}
          title={<Text style={{fontFamily: 'Conforta'}}>Хайх..</Text>}
        />
      );
    }
  };
  const styleBoard = useAnimatedStyle(() => {
    return {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{translateX: transY.value}],
      borderTopLeftRadius: 20,
      marginBottom: 20,
      borderBottomLeftRadius: 20,
    };
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.BackGround}}>
      {getHeader()}
      <Animated.ScrollView
        snapToInterval={D.HEIGHT / 3}
        ref={scrollRef}
        style={{backgroundColor: color.BackGround}}
        scrollEventThrottle={1}
        decelerationRate={0}
        snapToAlignment={'center'}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <BackWrapper Y={transY}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <SonurFox height={160} />
            <Animated.View style={styleBoard}>
              <UserStats />
            </Animated.View>
          </View>
        </BackWrapper>
        {children}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
const StickyHeaderWrapper = (headerType = MAIN.HEADER.WITH.SEARCH) => (
  Component,
) => {
  if (headerType === MAIN.HEADER.WITH.BACK) {
    return class Wrapped extends React.Component {
      render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor: '#e8ebf2'}}>
            <Header
              {...this.props}
              relative
              backAction
              replace
              title={<Text>📖</Text>}
            />
            <Component {...this.props} />
          </SafeAreaView>
        );
      }
    };
  }
  return class Wrapped extends React.Component {
    render() {
      return (
        <ScrollContainer headerType={headerType}>
          <Component {...this.props} />
        </ScrollContainer>
      );
    }
  };
};
export default StickyHeaderWrapper;
