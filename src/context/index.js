import React, {createContext, Component} from 'react';
//import {View, StyleSheet} from 'react-native';

import {GLOBAL_VALUE, single_values} from './states';
//import {checkInternetConnectivity} from './check';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import {maxDrag} from '../configs';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import {getCachePath} from '../utils';
export const Contextulize = createContext();

export const ContextProvider = (props) => {
  const globalDrag = useSharedValue(maxDrag);
  const [state, setState] = React.useState(GLOBAL_VALUE);
  React.useEffect(() => {
    //checkConnection();
    init();
  }, []);
  const init = () => {
    checkDowload();
    //fetchBooks();
  };
  const checkDowload = async () => {
    const {fs} = RNFetchBlob;
    try {
      let downloaded = {};
      let exist = await fs.exists(getCachePath().main);
      if (exist) {
        let bookDirs = await fs.ls(getCachePath().main);
        for (let i of Object.keys(bookDirs)) {
          if (bookDirs[i] !== undefined) {
            downloaded[bookDirs[i]] = bookDirs[i];
          }
        }
        setState({...state, downloads: downloaded});
      } else {
        console.log('doesnt exist');
      }
    } catch (e) {
      console.log(e);
    }
    // fs.ls(getCachePath().main)
    //   .then((bookDirs) => {
    //     for (let i of Object.keys(bookDirs)) {
    //       let _path = getCachePath(bookDirs[i]);
    //       fs.ls(_path.dir).then((files) => {
    //         console.log(files);
    //         // fs.readFile(_path.info, 'base64').then((res) => {
    //         //   console.log(res);
    //         // });
    //       });
    //     }
    //   })
    //   .catch((e) => console.log(e));
  };
  const downloadBook = (book) => {
    if (book === undefined) {
      throw new Error('url can not be empty');
    }
    const {thumbnail, title, audioFile, ...rest} = book;
    const _path = getCachePath(title);
    const book_infos = JSON.stringify({title, ...rest});
    setState({...state, dowloading: true});
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: _path.audio,
    })
      .fetch('GET', audioFile)
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .then(async () => {
        try {
          await RNFetchBlob.config({path: _path.img}).fetch('GET', thumbnail);
          await RNFetchBlob.fs.writeFile(_path.info, book_infos, 'utf8');
          setState({...state, dowloading: false});
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => {
        setState({...state, dowloading: false});
        console.log(e);
      });
  };
  const FetchBookDetail = () => {};
  // componentWillUnmount() {}
  const checkConnection = () => {
    NetInfo.addEventListener((net) => {
      if (!net.isConnected) {
        setState({...state, offline: true});
      } else {
        setState({...state, offline: false});
      }
    });
  };
  const setUser = (obj) => {
    setState({user: obj});
  };
  const setGplayer = (obj) => {
    let instance = Object.assign(GLOBAL_VALUE.gplayer, {...obj});
    setState({
      ...state,
      gplayer: {...instance, isActive: true, isToggled: true},
    });
    globalDrag.value = withSpring(0);
  };

  const fetchBooks = async () => {
    let newBooks = [];
    try {
      const response = await firestore().collection('books').get();
      for (let o of response.docs) {
        let instance = await Object.assign(single_values.book, {
          ...o.data(),
          isLocked: false,
        });
        newBooks.push(instance);
      }
      setNewBooks(newBooks);
    } catch (e) {
      console.log(e);
    }
  };
  const toggleGplayer = (bool) => {
    setState({
      gplayer: {
        ...state.gplayer,
        isToggled: bool,
      },
    });
  };
  const setNewBooks = (books) => {
    if (books === undefined) return;
    setState({...state, books: {...state.books, new_books: books}});
  };

  return (
    <Contextulize.Provider
      value={{
        stats: state,
        dragValue: globalDrag,
        methods: {
          setGplayer: (o) => setGplayer(o),
          toggleGplayer: (b) => toggleGplayer(b),
          downloadBook: (b) => downloadBook(b),
        },
      }}>
      {props.children}
    </Contextulize.Provider>
  );
};

export function withGlobalContext(Component) {
  return class WrapperComponent extends React.Component {
    render() {
      return (
        <Contextulize.Consumer>
          {(store) => (
            <>
              <Component {...this.props} global={store} />
            </>
          )}
        </Contextulize.Consumer>
      );
    }
  };
}
