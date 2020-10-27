import React, {useCallback, useState} from 'react';
import {View, Pressable, Text} from 'react-native';

export const WrapTextContent = (props) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <Pressable onPress={toggleNumberOfLines}>
      <View style={props.style}>
        <Text style={{lineHeight: 21}}>{props.children}</Text>
        {lengthMore ? (
          <Text
            onPress={toggleNumberOfLines}
            style={{lineHeight: 21, marginTop: 10}}>
            {textShown ? 'Хаах' : 'Цааш'}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
};
