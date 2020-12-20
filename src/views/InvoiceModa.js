import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Button from '../components/Button';
import {material} from 'react-native-typography';
import {ModalContent, ModalTitle, BottomModal} from 'react-native-modals';
import BookHero from '../components/BookHeroCard';
import {numberWithCommas} from '../utils';
export default ({
  targetItem = {},
  onTouchOutside = function () {},
  onSwipeOut = function () {},
  visible = false,
  onSubmit = function () {},
}) => {
  return (
    <View>
      <BottomModal
        visible={visible}
        onTouchOutside={onTouchOutside}
        height={0.9}
        width={1}
        onSwipeOut={onSwipeOut}
        modalTitle={
          <ModalTitle
            textStyle={{fontFamily: 'Conforta'}}
            title="Авах"
            hasTitleBar
          />
        }>
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: 'fff',
          }}>
          <View
            style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
            <Text numberOfLines={4} style={[material.title]}>
              {targetItem.title || 'no title'}
            </Text>
            <Text
              numberOfLines={4}
              style={[material.caption, {marginBottom: 10}]}>
              {targetItem.author || 'no author'}
            </Text>
            <BookHero
              disable
              img={
                targetItem.thumbnail ||
                'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'
              }
            />
            <Text
              numberOfLines={1}
              style={[material.headline, {marginTop: 10, color: 'green'}]}>
              {numberWithCommas(targetItem.price || 0)}₮
            </Text>
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
