import React, {createContext, useState} from 'react';
//import {View, StyleSheet} from 'react-native';

import {GLOBAL_VALUE, single_values} from './states';
//import {checkInternetConnectivity} from './check';
import firestore from '@react-native-firebase/firestore';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import {maxDrag} from '../configs';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import {getCachePath} from '../utils';
export const Contextulize = createContext();

class ConnectionInfoSubscriptionWrapper extends React.Component {
  _subscription = null;
  state = {
    connectionInfo: {isConnected: null},
  };
  componentDidMount() {
    this._subscription = NetInfo.addEventListener(
      this._handleConnectionInfoChange,
    );
  }
  componentDidUpdate(_preProps, preState) {
    if (this.state.connectionInfo !== preState.connectionInfo) {
      let isConnected = this.state.connectionInfo.isConnected;
      Toast.show({
        text1: isConnected ? '😃 онлайн горим' : '😪 офлайн горим',
        text2: isConnected
          ? 'Тавтай морил'
          : 'wifi асааж онлайн горимд шилжинэ',
        type: isConnected ? 'netOn' : 'netOff',
        topOffset: 0,
      });
    }
  }
  componentWillUnmount() {
    this._subscription && this._subscription();
  }
  _handleConnectionInfoChange = (connectionInfo) => {
    this.setState(() => ({
      connectionInfo: connectionInfo,
    }));
  };

  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            connectionInfo: this.state.connectionInfo,
          });
        }
        return child;
      },
    );
    return <>{childrenWithProps}</>;
  }
}

const Context = ({connectionInfo, ...props}) => {
  const globalDrag = useSharedValue(maxDrag);
  const AnimatedDownloadProgress = useSharedValue(0);
  const [downloads, setDownloads] = useState({});
  const [download, setDownload] = useState({
    isloading: false,
    total: 0,
    progress: 0,
    received: 0,
    installed: false,
  });
  const [state, setState] = useState(GLOBAL_VALUE);
  React.useEffect(() => {
    init();
  }, [download.isloading]);
  const init = () => {
    if (download.isloading === false) {
      checkDowload();
    }
    fetchBooks();
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
        setDownloads({...downloads, ...downloaded});
      } else {
        console.log('doesnt exist');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const downloadBook = (book) => {
    if (book === undefined) {
      throw new Error('url can not be empty');
    }
    const {thumbnail, title, audioFile, ...rest} = book;
    const _path = getCachePath(title);
    const book_infos = JSON.stringify({title, ...rest});
    setDownload({...download, isloading: true});
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: _path.audio,
    })
      .fetch('GET', audioFile)
      .progress({interval: 250}, (received, total) => {
        let progress = received / total;
        global.ADP = progress;
        setDownload({...download, received, total, progress});
      })
      .then(async () => {
        try {
          await RNFetchBlob.config({path: _path.img}).fetch('GET', thumbnail);
          await RNFetchBlob.fs.writeFile(_path.info, book_infos, 'utf8');
          setDownload({
            ...download,
            isloading: false,
          });
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => {
        setDownload({...download, loading: false});
        console.log(e);
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
    if (state.books.new_books.length > 0) return;
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
        ADP: AnimatedDownloadProgress,
        dragValue: globalDrag,
        downloads,
        download,
        isOnline: connectionInfo.isConnected || false,
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
export const ContextProvider = ({children}) => (
  <ConnectionInfoSubscriptionWrapper>
    <Context>{children}</Context>
  </ConnectionInfoSubscriptionWrapper>
);
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
