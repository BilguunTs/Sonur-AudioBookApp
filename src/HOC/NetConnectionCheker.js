import React, {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
class NetChecker extends Component {
  _subscription = null;
  state = {
    connectionInfo: {isConnected: null},
  };
  componentDidMount() {
    console.log(' I am called');
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
export default (Rcomponent) => {
  return class Wrapper extends Component {
    render() {
      return (
        <NetChecker>
          <Rcomponent>{this.props.children}</Rcomponent>
        </NetChecker>
      );
    }
  };
};
