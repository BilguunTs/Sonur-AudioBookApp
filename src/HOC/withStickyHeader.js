import React,{useRef} from 'react';
import { SafeAreaView,Text, View} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
  } from 'react-native-reanimated';
import {MAIN} from '../configs'
import Header from "../layout/Header"
import {BackWrapper} from '../components/BackWrapper'
import TestSvg from '../svg'

const ScrollContainer =({children,headerType})=>{
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
    const getHeader=()=>{
      if(headerType===MAIN.HEADER.WITH.SEARCH){
        return <Header transY={transY}
                       title={<Text style={{fontFamily:'Conforta'}}>
                        Хайх..</Text>} />
      } 
    } 
    return <SafeAreaView style={{flex: 1,backgroundColor:'#e8ebf2'}}> 
          {getHeader()}
            <Animated.ScrollView
              ref={scrollRef}
              style={{backgroundColor: '#e8ebf2'}}
              scrollEventThrottle={1}
              decelerationRate={0}
              snapToAlignment={'center'}
              onScroll={scrollHandler}
              showsVerticalScrollIndicator={false}>  
                <BackWrapper Y={transY}>
          <TestSvg />
                </BackWrapper>          
              {children}
            </Animated.ScrollView>
    </SafeAreaView>
}
const StickyHeaderWrapper =(headerType=MAIN.HEADER.WITH.SEARCH)=>(Component)=>{
   if(headerType===MAIN.HEADER.WITH.BACK){
        return class Wrapped extends React.Component{
            render(){
              
               return <SafeAreaView style={{flex: 1,backgroundColor:'#e8ebf2'}}>
                       <Header 
                              {...this.props} 
                               relative 
                               backAction 
                               replace
                               title={<Text style={{fontFamily:'Conforta'}}>
                        дүдэр</Text>} />
                      <Component {...this.props}/>
                      </SafeAreaView>
       
            }
        }  
    }
    return class Wrapped extends React.Component{
     render(){
        return <ScrollContainer headerType={headerType}>
               <Component {...this.props}/>
               </ScrollContainer>

     }
 }     
}
export default StickyHeaderWrapper
