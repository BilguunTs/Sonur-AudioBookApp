import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { iOSUIKit } from 'react-native-typography'
import {MAIN} from '../configs'
import {BoxShadow} from '../modules'
const BookHeroCard = ({
  onPress,
  title = '',
  author = '',
  img,
  margin = 0,
  disable = false,
  width = 122,
  contrast
}) => {
  const Title=!contrast?iOSUIKit.title3:iOSUIKit.title3White
const FootNote=!contrast?iOSUIKit.footnote:iOSUIKit.footnoteWhite
  return (
    
    <TouchableOpacity  disabled={disable} onPress={onPress}>
      <BoxShadow setting={MAIN.shadowOpt}>
      <Image
        style={{margin, width, ...styles.stretch}}
        source={{uri: img}}
      />
        </BoxShadow>
      {!disable && (
        <View>
          <Text numberOfLines={1} style={{fontFamily:"Conforta",...Title}}>{title}</Text>
          <Text numberOfLines={1} style={[FootNote,{fontFamily:'Conforta'}]}>{author}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BookHeroCard;
const styles = StyleSheet.create({
  stretch: {
    height: MAIN.book.height,
    width: 122,
    overflow: 'hidden', 
    borderRadius: 10,    
    //zIndex: 20,
    
  },
});
