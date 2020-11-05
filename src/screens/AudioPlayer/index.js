import React from 'react';

import {View, ScrollView, Text} from 'react-native';
import FluidChapters from './FluidChapters';
import MainPlayer from './MainPlayer';
export default function AudioPlayer({route}) {
  const [current, setCurrent] = React.useState();

  const {title, thumbnail} = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      {/* <FluidPlayButton /> */}
      <MainPlayer filename="testaudio.mp3" />
      <FluidChapters />
    </View>
  );
}
