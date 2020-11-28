import React, {createContext, Component} from 'react';
import {View,StyleSheet } from 'react-native';
import Animated,{useSharedValue,useAnimatedGestureHandler} from 'react-native-reanimated'
import {GLOBAL_VALUE,single_values} from './states'

export const Contextulize = createContext();
const dummydata=[
  { id:'1',
    title: 'Dudasd',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      path: '',
    },
    count_chapter:30,
    duration:"10:33:03",
    about:"this is book about asdf blasjlkajsblkjasbdlbsdjsblkjsbldkjs some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg",
    price:20000
  },
  { id:'2',
    title: 'HarryPotter:Prisoner of Azbakan',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png',
      path: '',
    },
    count_chapter:20,
    duration:"20:33:33",
    about:"this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg",
    price:14000
  },
  {
     id:'3',
     title: 'The lord of the rings',
     author: 'ude2',
     thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
      path: '',
    },
    count_chapter:40,
    duration:"5:34:13",
    about:"this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg",
    price:34000
  },
  {
    id:'4',
    title: 'Dudeest',
    author: 'ude3',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png',
      path: '',
    },
    count_chapter:30,
    duration:"1:44:32",
    about:"this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg",
    price:5000
  },
];
const dummyuser={
  name:"bilguun",
  email:"sketchuso@gmail.com",
  purchased:{
    "1":{title:"Dudasd"},
    "4":{title:"Dudeest"}
  }
}

export class ContextProvider extends Component{
    constructor(props) {
        super(props);
        this.state = {...GLOBAL_VALUE}
      }
    componentDidMount(){
      if(this.state.books.new_books.length===0){
        this.init()
      }
    }
    init =()=>{
      //let user = Object.assign(single_values.user,{...dummyuser,isAuth:true})
      //this.setUser(user)
      this.initBooks()
     }
     componentWillUnmount(){
       console.log('unmounting')
     }
    setUser =(obj)=>{
      this.setState({user:obj})
    }
    setGplayer =(obj)=>{
      let instance = Object.assign(GLOBAL_VALUE.gplayer,{...obj});
      this.setState({gplayer:{...instance,isActive:true}})
    }
    initBooks = async()=>{
      if(dummydata===undefined||dummyuser===undefined)return
      const userbooks=dummyuser.purchased
      try{
        let fixedBooks=[]
        for( let b of dummydata){
        let instance =await Object.assign(single_values.book,{...b})
        if(userbooks[b.id]===undefined){
          instance.isLocked= true      
        } else if( userbooks[b.id]!==undefined){
          instance.isLocked= false
        }
        fixedBooks.push({...instance})
      }
      this.setNewBooks(fixedBooks)
    }catch(e){
      console.log(e)
    }
    }
    setNewBooks=(books)=>{
     if(books===undefined)return
     this.setState({books:{...this.state.books,new_books:books}})
    }
    render(){ 
     return(
       <Contextulize.Provider
        value={{
            stats:this.state,
            methods:this._getMethods()
        }}>
        {this.props.children}
      </Contextulize.Provider>)
    }
    _getMethods(){
        return{
            setGplayer:(o)=>this.setGplayer(o)
        }
    }
}

export function withGlobalContext(Component) {
    return class WrapperComponent extends React.Component {
      render() {
        return (
          <Contextulize.Consumer>
            {(store) =><> 
            <Component {...this.props} global={store} />
          </>}
          </Contextulize.Consumer>
        );
      }
    };
}