import React, {Component} from 'react';
import PlayAction from './PlayButton';
import PurchaseBtn from './PurchaseBtn';
import firestore from '@react-native-firebase/firestore';
import InvoiceModal from '../views/InvoiceModa';
import Toast from 'react-native-toast-message';
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
  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      if (this.props.type !== 'purchased') {
        this.setState({showInvoice: false});
      }
    }
  }
  componentWillUnmount() {
    this.setState({showInvoice: false});
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
  addToPurchased = async () => {
    const {global, item} = this.props;
    const db = firestore();
    try {
      const user = await db.collection('Users').doc(global.user.uid);
      const bookRef = await db.doc('books/' + item.id);
      user.update({
        purchased: firestore.FieldValue.arrayUnion(bookRef),
      });
      this.setState({showInvoice: false}, () => {
        Toast.show({
          type: 'success',
          text1: 'Амжилттай нээгдлээ',
          text2: 'танд амжилт хүсье',
        });
      });
    } catch (e) {
      console.log(e);
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
    const {type, isDownloaded = false} = this.props;
    if (type === 'purchase' && !isDownloaded) {
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
          onSubmit={() => this.addToPurchased()}
          onTouchOutside={() => this.setState({showInvoice: false})}
        />
      </>
    );
  }
}
