import React, {useEffect} from 'react';

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
import InvoiceTest from '../views/InvoiceModa';
const ScreenOne = () => {
  const navigation = useNavigation();

  return (
    <View style={{height: D.HEIGHT}}>
      <FeaturedList navigation={navigation} grouptitle="Шинэ ном" />
      <InvoiceTest />
      <View style={{height: D.HEIGHT / 4}} />
    </View>
  );
};
const HomeScreen = withHeader()(ScreenOne);
export {HomeScreen};
