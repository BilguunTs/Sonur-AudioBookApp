import React, { Component } from 'react';
import {
  View,
StyleSheet  
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import {D,color} from '../configs'
class TabViews extends Component {
  render() {
    return (
        <View style={[styles.container]}>
          <ScrollableTabView
            onScroll={this.props.onScroll}
              tabBarActiveTextColor={color.PRIMARY}
              renderTabBar={() => <TabBar 
                tabBarTextStyle={{fontFamily:"Conforta"}}
                style={{width:D.WIDTH}}
                underlineColor={color.PRIMARY} />}>
            {this.props.children}
            </ScrollableTabView>

        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,

      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#212121',
      marginBottom: 5,
      fontSize: 28,
    },
  });
  
export default TabViews