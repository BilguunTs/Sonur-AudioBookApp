import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import FeaturedList from '../views/HorizontalBookView';
import TopBookLists from '../views/TopBookCarousel';
import Header from '../layout/Header';
import {D} from '../configs';
import {interpolateColors} from '../utils';
export const HomeScreen = ({navigation}) => {
  const transY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header transY={transY} title={'Хайх..'} />

      <Animated.ScrollView
        ref={scrollRef}
        style={{backgroundColor: '#e8fff9'}}
        scrollEventThrottle={1}
        decelerationRate={0}
        snapToInterval={200} //your element width
        snapToAlignment={'center'}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <TopBookLists transY={transY} navigation={navigation} />
        <FeaturedList navigation={navigation} grouptitle="Caнaл бoлгoх" />
        <FeaturedList navigation={navigation} grouptitle="Cүүлд нэmэгдcэн" />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
