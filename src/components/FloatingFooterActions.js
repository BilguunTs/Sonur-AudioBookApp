import React, {Component} from 'react';
import PlayAction from './PlayButton';
import PurchaseBtn from './PurchaseBtn';

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
    return <>{this.getActions()}</>;
  }
}
