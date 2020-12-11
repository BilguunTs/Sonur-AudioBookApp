import React, {Component} from 'react';
import {Text} from 'react-native';
import PlayBtn from './PlayButton';
import Modal, {
  ScaleAnimation,
  ModalContent,
  ModalTitle,
} from 'react-native-modals';
import LottieView from 'lottie-react-native';
import PurchaseBtn from './PurchaseBtn';
export default class FloatingFooterActions extends Component {
  constructor(props) {
    super(props);
    this.size = this.props.size || 40;
    this.state = {
      showModal: false,
    };
  }
  PlayIfDownloaded = () => {
    const {global, isDownloaded, item, navigation} = this.props;
    if (isDownloaded) {
      global.methods.setGplayer(item);
      navigation.goBack();
    } else {
      global.methods.downloadBook(item);
    }
  };

  handlePress = () => {
    const {type} = this.props;
    switch (type) {
      case 'purchase':
        console.log('should open invoice dialog');
        break;
      case 'play':
        this.setState({showModal: true});
        //this.PlayIfDownloaded();
        break;
    }
  };
  getActions = () => {
    const {type} = this.props;
    if (type === 'purchase') {
      return <PurchaseBtn onPress={this.handlePress} />;
    } else if (type === 'play') {
      return <PlayBtn onPress={this.handlePress} size={this.size} />;
    }
  };
  render() {
    return (
      <>
        {this.getActions()}
        <Modal
          modalAnimation={new ScaleAnimation()}
          visible={this.state.showModal}
          ref={(ref) => (this.modal = ref)}
          onTouchOutside={() => {
            this.setState({showModal: false});
          }}>
          <ModalContent style={{maxHeight: 300}}>
            {this.state.showModal && (
              <LottieView
                resizeMode="cover"
                source={require('../animation/downloading.json')}
                autoPlay
                style={{height: '100%', width: '100%'}}
              />
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
}
