import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
export const checkInternetConnectivity = () => {
  // For Android devices
  if (Platform.OS === 'android') {
    NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  } else {
    // For iOS devices
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );
  }
};
