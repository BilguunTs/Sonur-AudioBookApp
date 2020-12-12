import React from 'react';
import Animated, {
  useDerivedValue,
  useSharedValue,
  useAnimatedScrollHandler,
  withSpring,
} from 'react-native-reanimated';
import {FlatList} from 'react-native';
import BookItem from '../components/FlatBookItem';
import {D, MAIN} from '../configs';
//import {withHeader} from '../HOC'
import {withGlobalContext} from '../context';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const VerticalBooks = ({navigation, params, ...props}) => {
  const direction = useSharedValue(0);
  const {stats} = props.global;
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
        img={item.thumbnail}
        onPress={() => navigation.navigate('BookDetail', {...item})}
        {...item}
      />
    );
  };
  const handleFetchMore = () => {};
  return (
    <AnimatedFlatList
      data={stats?.books.new_books}
      onScroll={scrollHandler}
      onEndReachedThreshold={0.4}
      onEndReached={handleFetchMore.bind(this)}
      style={[{marginHorizontal: 10}]}
      ListFooterComponent={<Animated.View style={{height: D.HEIGHT / 5}} />}
      ListHeaderComponent={<Animated.View style={{height: D.HEIGHT / 5}} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};
export default withGlobalContext(VerticalBooks);
