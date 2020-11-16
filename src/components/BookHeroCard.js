import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { iOSUIKit } from 'react-native-typography'
import {withlimit} from '../utils/replaceString';
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
    <TouchableOpacity disabled={disable} onPress={onPress}>
      <Image
        style={{margin, width, ...styles.stretch}}
        // source={require('../../assets/img/art.jpg')}
        source={{uri: img}}
      />
      {!disable && (
        <View
          style={{
            marginVertical: 15,
            
          }}>
          <Text numberOfLines={1} style={{fontFamily:"Conforta",...Title}}>{title}</Text>
          <Text numberOfLines={1} style={[FootNote,{fontFamily:'Conforta'}]}>{withlimit(author)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BookHeroCard;
const styles = StyleSheet.create({
  stretch: {
    height: 150,
    width: 122,
    overflow: 'hidden',
    
    zIndex: 20,
  },
});
