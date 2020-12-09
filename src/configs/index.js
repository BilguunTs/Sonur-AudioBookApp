import {Dimensions} from 'react-native';

export const D = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
};
export const color = {
  PRIMARY: '#9088d4',
  ripple: 'rgba(144, 136, 212,0.3)',
  BackGround: '#e8ebf2',
};
export const Drag = {
  MAX_AT_FLUID: D.HEIGHT * 0.6,
};

export const MAIN = {
  app_name: 'Сонур',
  spring: {damping: 20, stiffness: 90},
  CIRCLE_SIZE: D.HEIGHT - D.HEIGHT * 0.85,
  book: {
    height: 150,
    width: 110,
  },
  HEADER: {
    TYPE: {
      FLOAT: 'FLOAT',
      STICKY: 'STICKY',
      RELATIVE: 'RELATIVE',
    },
    WITH: {
      BACK: 'BACK',
      SEARCH: 'SEARCH',
    },
  },
  bottom_tab: {
    HEIGHT: 60,
  },
  shadowOpt: {
    height: 150,
    width: 110,
    color: '#000',
    border: 10,
    radius: 10,
    opacity: 0.2,
    x: 5,
    y: 10,
    style: {marginVertical: 10},
  },
  shadow_Play_BTN: {
    width: 80,
    height: 80,
    color: color.PRIMARY,
    border: 20,
    radius: 30,
    opacity: 0.2,
    x: 0,
    y: 0,
    style: {marginVertical: 10},
  },
};
export const maxDrag = D.HEIGHT - MAIN.bottom_tab.HEIGHT;
