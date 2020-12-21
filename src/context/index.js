import React, {createContext, useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';
import {withConnectionInfoSubscription} from '../HOC';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import AuthScreen from '../screens/Authentication';
import {GLOBAL_VALUE, single_values} from './states';

import {maxDrag, color} from '../configs';
import {getCachePath} from '../utils';

export const Contextulize = createContext();

const Context = ({
  connectionInfo,
  user,
  newBooks,
  setUser,
  startLoad,
  ...props
}) => {
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
  useEffect(() => {
    if (download.isloading === false) {
      checkDowload();
    }
  }, [download.isloading]);
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
    const {thumbnail, title, audioFile, id, ...rest} = book;
    const _path = getCachePath(id);
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
        //setDownload({...download, received, total, progress});
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

  const setGplayer = (obj) => {
    let instance = Object.assign(GLOBAL_VALUE.gplayer, {...obj});
    setState({
      ...state,
      gplayer: {...instance, isActive: true, isToggled: true},
    });
    globalDrag.value = withSpring(0);
  };

  const toggleGplayer = (bool) => {
    setState({
      gplayer: {
        ...state.gplayer,
        isToggled: bool,
      },
    });
  };

  return (
    <Contextulize.Provider
      value={{
        stats: state,
        user,
        ADP: AnimatedDownloadProgress,
        dragValue: globalDrag,
        downloads,
        download,
        newBooks,
        isOnline: connectionInfo.isConnected || false,
        methods: {
          setGplayer: (o) => setGplayer(o),
          toggleGplayer: (b) => toggleGplayer(b),
          downloadBook: (b) => downloadBook(b),
          startGlobalLoad: () => startLoad(),
        },
      }}>
      {props.children}
    </Contextulize.Provider>
  );
};
const GrandContext = ({children, ...props}) => {
  const [user, setUser] = useState(GLOBAL_VALUE.user);
  const [newBooks, setNewBooks] = useState([]);
  useEffect(() => {
    if (props.incomingUser.uid) {
      const subscriber = firestore()
        .collection('Users')
        .doc(props.incomingUser.uid)
        .onSnapshot((snapshot) => {
          update(snapshot);
        });
      return () => subscriber();
    }
  }, [props.incomingUser]);
  const update = async (snapshot) => {
    try {
      const updatedUser = await updateUser(snapshot);
      fetchBooksForThisUser(updatedUser);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchBooksForThisUser = async (user) => {
    if (user === undefined) return;
    let newBooks = [];
    try {
      const response = await firestore().collection('books').get();
      for (const o of response.docs) {
        let isLocked = user.purchased[o.id] === undefined;
        newBooks.push({id: o.id, isLocked, ...o.data()});
      }
      setNewBooks(newBooks);
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = (document) => {
    if (document === undefined) return;
    let user = props.incomingUser;
    const purchased = {};
    const userdata = document.data();
    const newPurchased = userdata.purchased;
    if (newPurchased !== undefined && newPurchased !== {}) {
      for (const bookRef of newPurchased) {
        purchased[bookRef.id] = bookRef.id;
      }
    }
    user.purchased = purchased;
    global.user = user;
    setUser(user);
    return user;
  };
  return (
    <Context user={user} newBooks={newBooks} {...props}>
      {children}
    </Context>
  );
};
export const ContextProvider = withConnectionInfoSubscription(
  ({children, ...rest}) => {
    const [initializing, setInitializing] = useState(true);
    const [incomingUser, setIncomingUser] = useState(null);

    // Handle user state changes
    const startLoad = () => {
      setInitializing(true);
    };
    const createNewUserData = async (user) => {
      const userdata = {...user};
      try {
        const res = await firestore()
          .collection('Users')
          .add({...userdata});
      } catch (e) {
        console.log(e);
      }
    };
    const onAuthStateChanged = (res) => {
      if (res === null) {
        Toast.show({
          type: 'info',
          text1: 'Шууд нэвтрэх',
          text2:
            'хэрэв та facebook эсвэл google ийн бүртгэлтэй бол шууд нэвтэрч болно',
        });
      } else if (res !== null) {
        Toast.show({
          type: 'success',
          props: {elevation: 10},
          text1: 'Сайн уу',
          text2: 'Та амжилттай нэвтэрлээ',
          visibilityTime: 1000,
        });
      }
      setIncomingUser(res);
      if (initializing) setInitializing(false);
    };
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);
    getLoadingView = () => {
      if (initializing)
        return (
          <View style={[StyleSheet.absoluteFill, {backgroundColor: '#fff'}]}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={color.PRIMARY} size="large" />
            </View>
          </View>
        );
    };

    return (
      <>
        {incomingUser === null && <AuthScreen startLoad={startLoad} />}
        {incomingUser !== null && (
          <GrandContext
            incomingUser={incomingUser}
            startLoad={startLoad}
            {...rest}>
            {children}
          </GrandContext>
        )}
        {getLoadingView()}
      </>
    );
  },
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
