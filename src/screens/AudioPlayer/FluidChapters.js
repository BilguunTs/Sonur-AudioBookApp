import React, {useState} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedProps,
  interpolate,
  Extrapolate,
  useDerivedValue,
} from 'react-native-reanimated';
import {D, MAIN, color} from '../../configs';
import Icon from 'react-native-vector-icons/Feather';
import ChapterList from './ChapterList';
import {material} from 'react-native-typography';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function FluidChapters() {
  //  const [toggleList, setToggleList] = React.useState(false);
  const [modalType, setModalType] = useState(null);
  const uiView = useSharedValue(modalType);
  const toggleList = useDerivedValue(() => {
    if (modalType === null) return withSpring(0, {mass: 0.1});
    return withSpring(1, {mass: 0.1});
  }, [modalType]);

  const modalStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      toggleList.value,
      [0, 1],
      [D.HEIGHT / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      zIndex: toggleList.value,
      paddingHorizontal: 5,
      transform: [
        {
          translateY,
        },
      ],
      opacity: toggleList.value,
    };
  });
  const getChild = () => {
    switch (uiView.value) {
      case 'CHAPTER':
        return <ChapterList />;
      case 'VOLUME':
        return (
          <View>
            <Text style={{textAlign: 'center'}}>Тун удахгүй</Text>
          </View>
        );
      default:
        return null;
    }
  };
  const getHeaderText = () => {
    switch (uiView.value) {
      case 'CHAPTER':
        return 'Current chapter';
      case 'VOLUME':
        return 'Volume mix';
      default:
        return null;
    }
  };
  const styleGrower = useAnimatedStyle(() => {
    const height = interpolate(
      toggleList.value,
      [0, 1],
      [D.HEIGHT / 9, D.HEIGHT * 0.7],
      Extrapolate.CLAMP,
    );
    const width = interpolate(
      toggleList.value,
      [0, 1],
      [D.WIDTH * 0.9, D.WIDTH],
      Extrapolate.CLAMP,
    );
    const left = interpolate(
      toggleList.value,
      [0, 1],
      [D.WIDTH / 2 - (D.WIDTH * 0.9) / 2, D.WIDTH / 2 - width / 2],
      Extrapolate.CLAMP,
    );
    const bottom = interpolate(
      toggleList.value,
      [0, 1],
      [20, 0],
      Extrapolate.CLAMP,
    );
    const borderR = interpolate(
      toggleList.value,
      [0, 1],
      [25, 0],
      Extrapolate.CLAMP,
    );
    const zIndex = interpolate(
      toggleList.value,
      [0, 1],
      [5, 10],
      Extrapolate.CLAMP,
    );
    return {
      height,
      width,
      left,
      bottom,
      zIndex,
      borderBottomEndRadius: borderR,
      borderBottomLeftRadius: borderR,
      elevation: zIndex - 5,
    };
  });
  const disappearAble = useAnimatedStyle(() => {
    const zIndex = interpolate(
      toggleList.value,
      [0, 1],
      [0, 15],
      Extrapolate.CLAMP,
    );
    return {
      opacity: toggleList.value,
      zIndex,
    };
  });

  const toggleModal = (type) => {
    switch (type) {
      case 'CHAPTER':
        setModalType(type);
        break;
      case 'VOLUME':
        setModalType(type);
        break;
      default:
        setModalType(null);
    }
  };
  return (
    <Animated.View style={[style.listContainer, styleGrower]}>
      <View style={[style.lists]}>
        <Pressable
          android_ripple={{color: color.ripple, borderless: true}}
          onPress={toggleModal.bind(this, 'VOLUME')}
          style={[style.buttonBase]}>
          <AnimatedIcon
            name="sliders"
            size={30}
            height="100%"
            width="100%"
            color={'orange'}
          />
        </Pressable>
        <Pressable
          android_ripple={{color: color.ripple, borderless: true}}
          onPress={toggleModal.bind(this, 'CHAPTER')}
          style={[style.buttonBase]}>
          <AnimatedIcon
            name="list"
            size={30}
            height="100%"
            width="100%"
            color={color.PRIMARY}
          />
        </Pressable>
      </View>
      <Animated.View style={[style.listHeader, disappearAble]}>
        <Text
          style={[
            material.title,
            {maxWidth: D.WIDTH * 0.6, fontFamily: 'Conforta'},
          ]}
          numberOfLines={1}>
          {getHeaderText()}
        </Text>
        <Pressable
          android_ripple={{color: color.ripple, borderless: true}}
          onPress={toggleModal.bind(this)}
          style={[style.buttonBase]}>
          <AnimatedIcon
            name="x"
            size={30}
            height="100%"
            width="100%"
            color={'#212121'}
          />
        </Pressable>
      </Animated.View>
      <Animated.ScrollView style={[modalStyle]}>
        {getChild()}
      </Animated.ScrollView>
    </Animated.View>
  );
}
const style = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#f6f6f6',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  lists: {
    width: D.WIDTH * 0.9,
    position: 'absolute',
    bottom: 0,
    borderRadius: 14,
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'space-between',
    maxHeight: D.HEIGHT / 9,
    alignItems: 'center',
  },
  buttonBase: {
    height: D.HEIGHT / 9,
    width: '25%',
    borderRadius: 30,
    transform: [{scale: 0.8}],
    alignItems: 'center',
    zIndex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
