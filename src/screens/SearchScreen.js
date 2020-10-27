import React from 'react';
import {View, SafeAreaView, TextInput as Input} from 'react-native';

import {SearchViewTabs} from '../views/SearchViewTabs';
export default function SearchScreen() {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginTop: 64, marginHorizontal: 20, marginBottom: 30}}>
        <Input
          value={value}
          style={{borderRadius: 15}}
          placeholder="Хайх Ном, Зохиолч"
          onChangeText={(nextValue) => setValue(nextValue)}
        />
      </View>
      <SearchViewTabs />
    </SafeAreaView>
  );
}
