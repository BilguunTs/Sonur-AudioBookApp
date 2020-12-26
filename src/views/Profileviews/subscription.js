import React from 'react';
import {View, Text} from 'react-native';
import {withGlobalContext} from '../../context';
export default withGlobalContext(({global}) => {
  return (
    <View style={{alignItems: 'center', paddingTop: 20}}>
      <Text>хоосон</Text>
    </View>
  );
});
