import React from 'react';
import {StyleSheet, View, FlatList, Pressable} from 'react-native';

import CategoryHeroCards from '../components/CategoryHeroCard';
const Dummy = [
  {title: 'Шинжлэх ухаан', img: require('../../assets/img/science.jpg')},
  {
    title: 'Философи',
    img: require('../../assets/img/philosophy.jpg'),
  },
  {
    title: 'Урлаг',
    img: require('../../assets/img/art.jpg'),
  },
  {
    title: 'Уран зөгнөлт',
    img: require('../../assets/img/fiction.jpg'),
  },
  {
    title: 'Роман',
    img: require('../../assets/img/romance.jpg'),
  },
  {
    title: 'Хүүхдийн',
    img: require('../../assets/img/kids.jpg'),
  },
  {
    title: 'Түүхэн',
    img: require('../../assets/img/history.jpg'),
  },
  {
    title: 'Шашин',
    img: require('../../assets/img/religeon.jpg'),
  },
];
export const SearchViewTabs = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <FlatList
      data={Dummy}
      contentContainerStyle={{paddingBottom: 250}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Pressable onPress={() => alert(index)}>
            <CategoryHeroCards
              index={index}
              title={item.title}
              path={item.img}
            />
          </Pressable>
        </View>
      )}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    // alignItems: 'center',
    //  justifyContent: 'center',
  },
  herocontainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '50%', // is 50% of container width
    //height: '100%',
  },
});
