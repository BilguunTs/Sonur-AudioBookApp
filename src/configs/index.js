import {Dimensions} from 'react-native';

export const D = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
};
export const MAIN = {
  app_name: 'Сонур',
  spring: {damping: 20, stiffness: 90},
  CIRCLE_SIZE: D.HEIGHT-D.HEIGHT*0.85
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
  }
}