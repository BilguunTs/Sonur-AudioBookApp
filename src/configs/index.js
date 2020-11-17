import {Dimensions} from 'react-native';

export const D = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
};
export const MAIN = {
  app_name: 'Сонур',
  spring: {damping: 20, stiffness: 90},
  CIRCLE_SIZE: D.HEIGHT-D.HEIGHT*0.85,
  book:{
    height:D.HEIGHT/3.4
  },
  shadowOpt : {
    width:122,
    height:D.HEIGHT/3.4 ,
    color:"#000",
    border:10,
    radius:10,
    opacity:0.2,
    x:5,
    y:10,
    style:{marginVertical:10}
  },
  shadow_Play_BTN:{
    width:80,
    height:80,
    color:"#35cb6f",
    border:20,
    radius:30,
    opacity:0.2,
    x:0,
    y:0,
    style:{marginVertical:10}
  }
};

export const GLOBAL_VALUE={
  gplayer:{
    title:"",
    length:0,
    current:'',
    chapters:[],
    author:"",
    thumbnail:{},
    isActive:false
  },
  user:{}
}