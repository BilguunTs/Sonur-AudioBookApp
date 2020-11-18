import React, {useRef} from 'react';
import {SafeAreaView,Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import FeaturedList from '../views/HorizontalBookView';
import TopBookLists from '../views/TopBookCarousel';
import VerticalBookList from '../views/VerticalListBook'
import Header from '../layout/Header';
import {D} from '../configs';
import VerticalBooks from '../views/VerticalListBook';
//import {interpolateColors} from '../utils';
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
    <SafeAreaView style={{flex: 1,backgroundColor:'#e8ebf2'}}>
      <Header transY={transY} title={<Text style={{fontFamily:'Conforta'}}>Хайх..</Text>} />
      <Animated.ScrollView
        ref={scrollRef}
        style={{backgroundColor: '#e8ebf2'}}
        scrollEventThrottle={1}
        decelerationRate={0}
        snapToAlignment={'center'}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <TopBookLists transY={transY} navigation={navigation} />
        <FeaturedList navigation={navigation} grouptitle="Шинэ ном" />
        <Animated.View style={{height:D.HEIGHT/5}}/>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
/**suits on bigger data
<VerticalBooks navigation={navigation} onScroll={scrollHandler}/>
 *  <Animated.ScrollView
        ref={scrollRef}
        style={{backgroundColor: '#e8ebf2'}}
        scrollEventThrottle={1}
        decelerationRate={0}
  
        snapToAlignment={'center'}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <TopBookLists transY={transY} navigation={navigation} />
        <FeaturedList navigation={navigation} grouptitle="Caнaл бoлгoх" />
        <FeaturedList navigation={navigation} grouptitle="Cүүлд нэmэгдcэн" />
      </Animated.ScrollView>
 */