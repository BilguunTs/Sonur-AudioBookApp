import React, {useRef} from 'react';

import {View} from 'react-native'
import FeaturedList from '../views/HorizontalBookView';
//import FluidHeader from '../components/HeaderWithBackWrapper'
//import TopBookLists from '../views/TopBookCarousel';
//import VerticalBookList from '../views/VerticalListBook'
//import Header from '../layout/Header';
import {D} from '../configs';
//import VerticalBooks from '../views/VerticalListBook';
//import {interpolateColors} from '../utils';
import {withHeader} from '../HOC'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
const ScreenOne = () => {
  const navigation=useNavigation()
  return (
    <LinearGradient colors={["#caf0f8","#f5f5f5"]}> 
      <FeaturedList navigation={navigation} grouptitle="Шинэ ном" />
      <View style={{height:D.HEIGHT/5}}/>
    </LinearGradient>
  );
};
const HomeScreen = withHeader()(ScreenOne);
export {HomeScreen}
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