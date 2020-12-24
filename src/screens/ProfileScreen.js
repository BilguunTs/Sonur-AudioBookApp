import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import {iOSUIKit} from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalButton,
  ModalFooter,
} from 'react-native-modals';
import auth from '@react-native-firebase/auth';
import TabViews from '../views/TabViews';
import {withGlobalContext} from '../context';
class Profile extends Component {
  state = {
    exitAlert: false,
  };
  componentWillUnmount() {
    this.setState({exitAlert: false});
  }
  signOut = async () => {
    try {
      this.setState({exitAlert: false});
      this.props.global.methods.startGlobalLoad();
      const result = await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View style={style.container}>
        <View style={[style.header]}>
          <View style={[style.centered, style.flex1]}>
            <Text style={[iOSUIKit.title3]}>0</Text>
            <Text style={[style.text]}>дуусгасан</Text>
          </View>
          <View style={[style.centered, style.flex1]}>
            <View style={[style.avatarContainer, style.centered]}>
              <Image
                style={[style.avatar]}
                source={require('../../assets/img/avatar.png')}
              />
            </View>
          </View>
          <View style={[style.centered, style.flex1]}>
            <Pressable
              onPress={() => this.setState({exitAlert: true})}
              android_ripple={{borderless: true}}
              style={{alignItems: 'center', padding: 5}}>
              <Icon name="exit-to-app" color="gray" size={30} />
              <Text style={[style.text]}>Гарах</Text>
            </Pressable>
          </View>
        </View>
        <View style={[style.body]}>
          <View style={[style.centered, {marginVertical: 1}]}>
            <Text
              numberOfLines={1}
              style={[
                iOSUIKit.title3,
                style.text,
                {fontSize: 25, lineHeight: 30},
              ]}>
              {global.user?.email}
            </Text>
          </View>
          <View style={[style.tabContainer, style.centered]}>
            <TabViews>
              <View tabLabel={{label: 'Бүртгэл'}}></View>
              <View tabLabel={{label: 'Гишүүнчлэл'}}></View>
            </TabViews>
          </View>
        </View>
        <Modal
          visible={this.state.exitAlert}
          onTouchOutside={() => {
            this.setState({exitAlert: false});
          }}
          modalTitle={
            <ModalTitle
              textStyle={{textAlign: 'left', fontFamily: 'Conforta'}}
              hasTitleBar={false}
              title="Гарах"
            />
          }
          footer={
            <ModalFooter bordered={false}>
              <ModalButton
                text="Үгүй"
                textStyle={{color: 'gray', fontFamily: 'Conforta'}}
                onPress={() => this.setState({exitAlert: false})}
              />
              <ModalButton
                textStyle={{color: '#c21e56', fontFamily: 'Conforta'}}
                text="Тийм"
                onPress={this.signOut.bind(this)}
              />
            </ModalFooter>
          }>
          <ModalContent style={{width: 300}}>
            <Text style={{fontFamily: 'Conforta'}}>
              Энэ бүртгэлээс гарах уу?
            </Text>
          </ModalContent>
        </Modal>
      </View>
    );
  }
}
export default withGlobalContext(Profile);
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  test: {
    borderWidth: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Conforta',
  },
  flex1: {
    flex: 1,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 30,
    opacity: 0.5,
  },
  avatarContainer: {
    width: '100%',
  },
  body: {flex: 4},
  footer: {flex: 1},
});
