export const single_values = {
  chapter: {
    id: '',
    title: '',
    duration: 0,
  },
  book: {
    id: '',
    isLocked: true,
    title: '',
    author: '',
    about: '',
    thumbnail: {
      src: '',
    },
    count_chapter: 0,
    duration: '',
    page_num: 0,
    price: 0,
    chapters: [],
  },
  user: {
    isAuth: false,
    id: '',
    name: '',
    email: '',
    password: '',
    purchased: {},
    cart: {},
    reading: {},
  },
};

export const GLOBAL_VALUE = {
  gplayer: {
    title: '',
    length: 0,
    current: '',
    chapters: [],
    author: '',
    thumbnail: {},
    isActive: false,
    isToggled: false,
  },
  user: {
    isAuth: false,
    id: '',
    name: '',
    email: '',
    password: '',
    purchased: {},
    cart: {},
    reading: {},
  },
  downloads: {
    lists: [],
  },
  books: {
    new_books: [],
    top_books: [],
  },
  offline: false,
};
