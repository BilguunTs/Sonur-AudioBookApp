import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Button from '../components/Button';
import {ModalContent, ModalTitle, BottomModal} from 'react-native-modals';
import BookHero from '../components/BookHeroCard';
import testimg from '../svg/logowithletter.png';
export default ({targetItem = {}, onSubmit = function () {}}) => {
  const [open, setOpen] = useState(false);
  const handlePress = () => {
    setOpen(true);
  };
  const Close = () => {
    setOpen(false);
    return true;
  };
  return (
    <View>
      <Button title="invoice" onPress={handlePress.bind(this)} />
      <BottomModal
        visible={open}
        onTouchOutside={Close.bind(this)}
        height={0.8}
        width={1}
        onSwipeOut={Close.bind(this)}
        modalTitle={
          <ModalTitle
            textStyle={{fontFamily: 'Conforta'}}
            title="Нэхэмжлэл"
            hasTitleBar
          />
        }>
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: 'fff',
          }}>
          <View style={{flex: 0.8}}>
            <BookHero disable img={require('../svg/logowithletter.png')} />
          </View>
          <View
            style={{
              flex: 0.2,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Button
              style={{width: '100%'}}
              title="Батлах"
              onPress={onSubmit.bind(this)}
            />
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};
