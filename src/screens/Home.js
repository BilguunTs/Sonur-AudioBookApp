import React from 'react';
import {SafeAreaView, ScrollView, View, Text, Button} from 'react-native';

import FeaturedList from '../views/HorizontalBookView';
import TopBookLists from '../views/TopBookCarousel';
import Header from '../layout/Header'
export const HomeScreen = ({navigation}) => {
  const TopArea = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: '#ECE8FF',
            minHeight: 230,
            borderBottomLeftRadius: 230,
            marginBottom: 49,
            borderBottomRightRadius: 230,
          }}>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text category="h2">Caйнуу</Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Header contrast={true} title={'Шилдэг Номнууд'}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBookLists navigation={navigation} />
        <FeaturedList navigation={navigation} grouptitle="Caнaл бoлгoх" />
        <FeaturedList navigation={navigation} grouptitle="Cyyлд нэmэгдcэн" />
      </ScrollView>
    </SafeAreaView>
  );
};
