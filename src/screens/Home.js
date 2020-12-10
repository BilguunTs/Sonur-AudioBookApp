import React, {useRef} from 'react';

import {View} from 'react-native';
import FeaturedList from '../views/HorizontalBookView';
//import FluidHeader from '../components/HeaderWithBackWrapper'
//import TopBookLists from '../views/TopBookCarousel';
//import VerticalBookList from '../views/VerticalListBook'
//import Header from '../layout/Header';
import {D} from '../configs';
//import VerticalBooks from '../views/VerticalListBook';
//import {interpolateColors} from '../utils';
import {withHeader} from '../HOC';
import {useNavigation} from '@react-navigation/native';

const ScreenOne = () => {
  const navigation = useNavigation();
  return (
    <>
      <FeaturedList navigation={navigation} grouptitle="Шинэ ном" />
      <View style={{height: D.HEIGHT / 4}} />
    </>
  );
};
const HomeScreen = withHeader()(ScreenOne);
export {HomeScreen};
