import React from 'react';
import {FlatList, View} from 'react-native';
import BookItem from '../components/BookCardPlayerStatus';
import {D, MAIN} from '../configs';
import {getCachePath} from '../utils';
import {withGlobalContext} from '../context';
import RFB from 'rn-fetch-blob';
//import {withHeader} from '../HOC'

const DowloadedBookList = ({navigation, global}) => {
  const [lists, setLists] = React.useState([]);
  React.useEffect(() => {
    let obj = global.downloads;
    let isEmpty = Object.keys(obj).length === 0 && obj.constructor === Object;
    if (!isEmpty) {
      init();
    }
  }, [global.downloads]);
  const init = async () => {
    const downloads = global.downloads;
    let data = [];
    let instances = {};
    try {
      for (const val in downloads) {
        let _path = getCachePath(val);
        let args = await RFB.fs.readFile(_path.info);
        instances = {
          audioFile: _path.audio,
          img: 'file://' + _path.img,
          ...JSON.parse(args),
          isLocked: false,
        };
        data.push(instances);
      }
      setLists(data);
    } catch (e) {
      console.log(e);
    }
  };
  const renderItem = ({item}) => {
    const {img, ...rest} = item;
    return (
      <BookItem
        onPressPlay={() => {
          global.methods.setGplayer(item);
        }}
        onPress={() =>
          navigation.navigate('BookDetail', {
            thumbnail: img,
            ...rest,
            isDownloaded: true,
          })
        }
        img={img}
        {...rest}
      />
    );
  };
  return (
    <FlatList
      onEndReachedThreshold={0.4}
      style={[{marginHorizontal: 10}]}
      ListFooterComponent={<View style={{height: D.HEIGHT / 5}} />}
      ListHeaderComponent={<View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      data={lists}
      keyExtractor={(item) => item.toString()}
      renderItem={renderItem}
    />
  );
};
export default withGlobalContext(DowloadedBookList);
