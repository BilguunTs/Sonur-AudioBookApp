import React, {createContext, Component} from 'react';
//import {View, StyleSheet} from 'react-native';

import {GLOBAL_VALUE, single_values} from './states';
//import {checkInternetConnectivity} from './check';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {maxDrag} from '../configs';
import {useSharedValue, withSpring} from 'react-native-reanimated';
export const Contextulize = createContext();

const dummydata = [
  {
    id: '1',
    title: 'Dudasd',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      path: '',
    },
    count_chapter: 30,
    duration: '10:33:03',
    about:
      'this is book about asdf blasjlkajsblkjasbdlbsdjsblkjsbldkjs some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg',
    price: 20000,
  },
  {
    id: '2',
    title: 'HarryPotter:Prisoner of Azbakan',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/girl.png',
      path: '',
    },
    count_chapter: 20,
    duration: '20:33:33',
    about:
      'this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg',
    price: 14000,
  },
  {
    id: '3',
    title: 'The lord of the rings',
    author: 'ude2',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
      path: '',
    },
    count_chapter: 40,
    duration: '5:34:13',
    about:
      'this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg',
    price: 34000,
  },
  {
    id: '4',
    title: 'Dudeest',
    author: 'ude3',
    thumbnail: {
      src: 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png',
      path: '',
    },
    count_chapter: 30,
    duration: '1:44:32',
    about:
      'this is book about some girl and bla bla thaoid toasidgmevm, oaosie , oggasdg',
    price: 5000,
  },
];
const dummyuser = {
  name: 'bilguun',
  email: 'sketchuso@gmail.com',
  purchased: {
    1: {title: 'Dudasd'},
    4: {title: 'Dudeest'},
  },
};
export const ContextProvider = (props) => {
  const globalDrag = useSharedValue(maxDrag);
  const [state, setState] = React.useState(GLOBAL_VALUE);
  React.useEffect(() => {
    //checkConnection();
    init();
  }, []);
  const init = () => {
    //let user = Object.assign(single_values.user,{...dummyuser,isAuth:true})
    //this.setUser(user)
    initBooks();
  };
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
  const initBooks = async () => {
    if (dummydata === undefined || dummyuser === undefined) return;
    const userbooks = dummyuser.purchased;
    try {
      let fixedBooks = [];
      for (let b of dummydata) {
        let instance = await Object.assign(single_values.book, {...b});
        if (userbooks[b.id] === undefined) {
          instance.isLocked = true;
        } else if (userbooks[b.id] !== undefined) {
          instance.isLocked = false;
        }
        fixedBooks.push({...instance});
      }
      setNewBooks(fixedBooks);
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
