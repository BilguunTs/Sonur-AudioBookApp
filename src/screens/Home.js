import React, {useRef, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import FeaturedList from '../views/HorizontalBookView';
import TopBookLists from '../views/TopBookCarousel';
import Header from '../layout/Header';
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
      <Header transY={transY} title={'Шилдэг Номнууд'} />

      <Animated.ScrollView
        ref={scrollRef}
        style={{backgroundColor: '#fffffc'}}
        scrollEventThrottle={1}
        decelerationRate={0}
        snapToInterval={150} //your element width
        snapToAlignment={'center'}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <TopBookLists transY={transY} navigation={navigation} />
        <FeaturedList navigation={navigation} grouptitle="Caнaл бoлгoх" />
        <FeaturedList navigation={navigation} grouptitle="Cyyлд нэmэгдcэн" />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
