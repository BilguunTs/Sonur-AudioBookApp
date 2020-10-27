import React from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';

const image = {
  uri: 'https://reactjs.org/logo-og.png',
};

export default ({path, title = 'no title', index}) => {
  const IndexIsEven = () => {
    return index % 2 == 0;
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={path || image}
        style={{
          marginLeft: IndexIsEven() ? 20 : 15,
          marginRight: IndexIsEven() ? 15 : 20,
          marginVertical: 15,
          ...styles.image,
        }}>
        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 202,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  text: {
    color: 'white',
    fontSize: 25,
    margin: 3,
    fontWeight: 'bold',
  },
});
