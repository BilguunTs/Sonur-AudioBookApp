import React, {useState} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import {BottomModal, ModalContent, ModalTitle} from 'react-native-modals';
import {D, color} from '../../configs';
import Icon from 'react-native-vector-icons/Feather';
import ChapterList from './ChapterList';
export default function FluidChapters() {
  //  const [toggleList, setToggleList] = React.useState(false);
  const [modalType, setModalType] = useState(null);
  const [visible, setVisible] = useState(false);

  const getChild = () => {
    switch (modalType) {
      case 'CHAPTER':
        return <ChapterList />;
      case 'VOLUME':
        return (
          <View style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>Тун удахгүй</Text>
          </View>
        );
      default:
        return null;
    }
  };
  const getHeaderText = () => {
    switch (modalType) {
      case 'CHAPTER':
        return 'Current chapter';
      case 'VOLUME':
        return 'Volume mix';
      default:
        return null;
    }
  };

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
    setVisible(true);
  };
  const onTouchOutside = () => {
    setVisible(false);
  };
  return (
    <View style={[style.listContainer]}>
      <View style={[style.lists]}>
        <Pressable
          android_ripple={{color: color.ripple, borderless: true}}
          onPress={toggleModal.bind(this, 'VOLUME')}
          style={[style.buttonBase]}>
          <Icon
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
          <Icon
            name="list"
            size={30}
            height="100%"
            width="100%"
            color={color.PRIMARY}
          />
        </Pressable>
      </View>
      <BottomModal
        visible={visible}
        onTouchOutside={onTouchOutside}
        height={0.8}
        width={1}
        onSwipeOut={() => setVisible(false)}
        modalTitle={
          <ModalTitle
            textStyle={{fontFamily: 'Conforta'}}
            title={getHeaderText()}
            hasTitleBar
          />
        }>
        <ModalContent style={{flex: 1}}>{getChild()}</ModalContent>
      </BottomModal>
    </View>
  );
}
const style = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  lists: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#f6f6f6',
    borderRadius: 25,
    zIndex: 20,
  },
  buttonBase: {
    height: D.HEIGHT / 9,
    width: '25%',
    borderRadius: 30,
    transform: [{scale: 0.8}],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
/* <Pressable
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
        </Pressable> */
