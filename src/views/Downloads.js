import React from 'react';
import Animated, {
  useDerivedValue,
  useSharedValue,
  useAnimatedScrollHandler,
  withSpring,
} from 'react-native-reanimated';
import {FlatList} from 'react-native';
import BookItem from '../components/BookCardPlayerStatus';
import {D, MAIN} from '../configs';
//import {withHeader} from '../HOC'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const dummydata = [
  {
    id: '1',
    title: 'Dudasd',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      path: '',
    },
    count_chapter: 30,
    duration: '10:33:03',
    about:
      'this is book about asdf blasjlkajsblkjasbdlbsdjsblkjsbldkjs some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg',
    price: 20000,
  },
  {
    id: '2',
    title: 'HarryPotter:Prisoner of Azbakan',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png',
      path: '',
    },
    count_chapter: 20,
    duration: '20:33:33',
    about:
      'this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg',
    price: 14000,
  },
  {
    id: '3',
    title: 'The lord of the rings',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
      path: '',
    },
    count_chapter: 40,
    duration: '5:34:13',
    about:
      'this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg',
    price: 34000,
  },
  {
    id: '4',
    title: 'Dudeest',
    author: 'ude3',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png',
      path: '',
    },
    count_chapter: 30,
    duration: '1:44:32',
    about:
      'this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg',
    price: 5000,
  },
];
const VerticalBooks = ({navigation}) => {
  const direction = useSharedValue(0);
  const skewY = useDerivedValue(() => {
    if (direction.value === 1) {
      return withSpring(Math.PI / 18);
    } else if (direction.value === -1) {
      return withSpring(-Math.PI / 18);
    } else {
      return withSpring(0);
    }
  });
  const scrollHandler = useAnimatedScrollHandler({
    onEndDrag: () => {
      direction.value = 0;
    },
    onScroll: (event, ctx) => {
      const dy = event.contentOffset.y - (ctx?.y ?? 0);
      direction.value = Math.sign(dy);
      ctx.y = event.contentOffset.y;
    },
  });

  const renderItem = ({item}) => {
    return (
      <BookItem
        skewY={skewY.value}
        img={item.thumbnail.src}
        onPress={() => navigation.navigate('BookDetail', {...item})}
        {...item}
      />
    );
  };
  const handleFetchMore = () => {};
  return (
    <AnimatedFlatList
      onScroll={scrollHandler}
      onEndReachedThreshold={0.4}
      onEndReached={handleFetchMore.bind(this)}
      style={[{marginHorizontal: 10}]}
      ListFooterComponent={<Animated.View style={{height: D.HEIGHT / 5}} />}
      ListHeaderComponent={<Animated.View style={{height: D.HEIGHT / 5}} />}
      showsVerticalScrollIndicator={false}
      data={dummydata}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};
export default VerticalBooks;
