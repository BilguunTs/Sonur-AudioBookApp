import React from 'react';
import {SafeAreaView} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import FeaturedList from '../views/HorizontalBookView';
import TopBookLists from '../views/TopBookCarousel';
import Header from '../layout/Header';
export const HomeScreen = ({navigation}) => {
  const transY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

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

  const stylez = useAnimatedStyle(() => {
    const size = isScrolling.value ? 80 : 40;
    return {
      transform: [
        {
          translateY: transY.value,
        },
      ],
      width: withSpring(size),
      height: withSpring(size),
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View style={[stylez]}>
        <Header contrast={true} title={'Шилдэг Номнууд'} />
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <TopBookLists navigation={navigation} />
        <FeaturedList navigation={navigation} grouptitle="Caнaл бoлгoх" />
        <FeaturedList navigation={navigation} grouptitle="Cyyлд нэmэгдcэн" />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
