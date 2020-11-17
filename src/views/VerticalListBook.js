import React from 'react';
import Animated,{useDerivedValue,useSharedValue,useAnimatedStyle,useAnimatedScrollHandler,withSpring,interpolate} from 'react-native-reanimated'
import {FlatList} from 'react-native'
import BookItem from '../components/FlatBookItem'
import {D} from '../configs'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const dummydata=[
  {
    title: 'Dudasd',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      path: '',
    },
    count_chapter:30,
    duration:2
  },
  {
    title: 'HarryPotter:Prisoner of Azbakan',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png',
      path: '',
    },
    count_chapter:20,
    duration:3
  },
  {
    title: 'The lord of the rings',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
      path: '',
    },
    count_chapter:40,
    duration:3
  },
  {
    title: 'Dudeest',
    author: 'ude3',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png',
      path: '',
    },
    count_chapter:30,
    duration:3
  },
];
const VerticalBooks = ({onPress})=>{
    const direction = useSharedValue(0);
    const skewY=useDerivedValue(()=>{
      if(direction.value===1){
        return withSpring(Math.PI / 18)
      }else if(direction.value===-1){
        return withSpring(-Math.PI / 18)
      }else{
        return withSpring(0)
      }
    })
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
    
    const renderItem = ({ item }) => {
          return (<BookItem
            skewY={skewY.value}  
            img={item.thumbnail.src}
             {...item}
             onPress={onPress}
             />
             );
         }
    return <AnimatedFlatList
            onScroll={scrollHandler}   
            style={[{marginHorizontal:10}]}
            ListFooterComponent={<Animated.View style={{height:D.HEIGHT/5}}/>}   
            ListHeaderComponent={<Animated.View style={{height:D.HEIGHT/5}}/>}   
            showsVerticalScrollIndicator ={false} 
            data={dummydata} 
            keyExtractor={(item) => item.id} 
            renderItem={renderItem}/>
}
export default VerticalBooks