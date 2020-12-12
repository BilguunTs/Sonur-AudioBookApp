import React, {Component, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import PlayAction from './PlayButton';
import Modal, {
  ScaleAnimation,
  ModalContent,
  ModalTitle,
} from 'react-native-modals';
import LottieView from 'lottie-react-native';
import PurchaseBtn from './PurchaseBtn';
import {color} from '../configs';
const ProgressView = () => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          size="small"
          color={color.PRIMARY}
          style={{marginRight: 5}}
        />
        <Text style={{textAlign: 'center', fontFamily: 'Conforta'}}>
          татаж байна
        </Text>
      </View>
      <LottieView
        resizeMode="cover"
        autoPlay
        loop
        source={require('../animation/waitinpegeon.json')}
        onAnimationFinish={() => console.log('finished')}
        style={{height: '100%', width: '100%'}}
      />
    </>
  );
};

export default class FloatingFooterActions extends Component {
  constructor(props) {
    super(props);
    this.size = this.props.size || 40;
    this.state = {
      showModal: false,
      progress: 0,
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
  componentWillUnmount() {
    this.modal.dismiss();
  }
  handlePress = () => {
    const {type} = this.props;
    switch (type) {
      case 'purchase':
        console.log('should open invoice dialog');
        break;
      case 'play':
        this.PlayIfDownloaded();
        break;
    }
  };
  getActions = () => {
    const {type, isDownloaded} = this.props;
    if (type === 'purchase') {
      return <PurchaseBtn onPress={this.handlePress} />;
    } else if (type === 'play') {
      return (
        <PlayAction
          downloadMode={!isDownloaded}
          onPress={this.handlePress}
          size={this.size}
        />
      );
    }
  };
  render() {
    return (
      <>
        {this.getActions()}
        <Modal
          modalAnimation={new ScaleAnimation()}
          visible={this.props.global.download.isloading}
          ref={(ref) => (this.modal = ref)}>
          <ModalContent style={{maxHeight: 300}}>
            <ProgressView />
            {this.props.global.download.isloading && <ProgressView />}
          </ModalContent>
        </Modal>
      </>
    );
  }
}
