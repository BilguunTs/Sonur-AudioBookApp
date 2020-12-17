import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
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
const URI =
  'https://image.freepik.com/free-vector/cute-girl-gaming-holding-joystick-cartoon-icon-illustration-people-technology-icon-concept-isolated-flat-cartoon-style_138676-2169.jpg';
export default class Profile extends Component {
  state = {
    loading: false,
    exitAlert: false,
  };
  componentWillUnmount() {
    this.setState({exitAlert: false, loading: false});
  }
  SignOut = () => {
    this.setState({loading: true, exitAlert: false});
    auth()
      .signOut()
      .then(() => {
        this.setState({loading: false, exitAlert: false});
      })
      .catch((e) => {
        this.setState({loading: false, exitAlert: false});
      });
  };
  render() {
    return (
      <View style={style.container}>
        <View style={[style.header]}>
          <View style={[style.centered, style.flex1]}>
            <Text style={[iOSUIKit.title3]}>10</Text>
            <Text style={[style.text]}>дуусгасан</Text>
          </View>
          <View style={[style.centered, style.flex1]}>
            <View style={[style.avatarContainer, style.centered]}>
              <Image style={[style.avatar]} source={{uri: URI}} />
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
                onPress={this.SignOut.bind(this)}
              />
            </ModalFooter>
          }>
          <ModalContent style={{width: 300}}>
            {this.state.loading === false && (
              <Text style={{fontFamily: 'Conforta'}}>
                Энэ бүртгэлээс гарах уу?
              </Text>
            )}
          </ModalContent>
        </Modal>
        {this.state.loading && (
          <View style={StyleSheet.absoluteFill}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarContainer: {
    width: '100%',
  },
  body: {flex: 4},
  footer: {flex: 1},
});
