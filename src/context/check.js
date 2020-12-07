import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
export const checkInternetConnectivity = () => {
  // For Android devices
  if (Platform.OS === 'android') {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        Toast.show({
          type: 'success',
          text1: 'Сайн уу',
          text2: 'сонур апп-д тавтай морил 👋',
        });
      } else {
        Toast.show({
          type: 'info',
          text1: 'Уулчлаарай',
          text2: 'Та интернэтийн холболтоо шалгана уу',
        });
      }
    });
  } else {
    // For iOS devices
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );
  }
};
