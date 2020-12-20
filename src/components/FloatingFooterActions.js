import React, {Component} from 'react';
import PlayAction from './PlayButton';
import PurchaseBtn from './PurchaseBtn';
import InvoiceModal from '../views/InvoiceModa';
export default class FloatingFooterActions extends Component {
  constructor(props) {
    super(props);
    this.size = this.props.size || 40;
    this.state = {
      showModal: false,
      progress: 0,
      showInvoice: false,
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
        this.setState({showInvoice: true});
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
        <InvoiceModal
          visible={this.state.showInvoice}
          targetItem={this.props.item}
          onSwipeOut={() => this.setState({showInvoice: false})}
          onSubmit={() => {
            console.log('trying to buy?');
          }}
          onTouchOutside={() => this.setState({showInvoice: false})}
        />
      </>
    );
  }
}
