import React from 'react';
//import Icon from 'react-native-vector-icons/Feather';
import {AppNavigator as Main} from './src/routes';
import {ContextProvider} from './src/context';
import Toast, {BaseToast} from 'react-native-toast-message';
const toastConfig = {
  netOff: ({text1, text2, ...rest}) => {
    return (
      <BaseToast
        {...rest}
        leadingIcon={require('./assets/img/wifi-off.png')}
        style={{
          borderLeftColor: 'gray',
          width: '100%',
          elevation: 15,
          borderRadius: 0,
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1={text1}
        text2={text2}
      />
    );
  },
  netOn: ({text1, text2, ...rest}) => {
    return (
      <BaseToast
        {...rest}
        leadingIcon={require('./assets/img/wifi-on.png')}
        style={{
          borderLeftColor: 'green',
          width: '100%',
          elevation: 15,
          borderRadius: 0,
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1={text1}
        text2={text2}
      />
    );
  },
};

const AppSonur = () => (
  <>
    <ContextProvider>
      <Main />
    </ContextProvider>
    <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
  </>
);

export default AppSonur;
