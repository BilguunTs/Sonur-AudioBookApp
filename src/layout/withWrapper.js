import React, {useCallback, useState} from 'react';
import {View, Pressable, Text} from 'react-native';

export const WrapTextContent = (props) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
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
