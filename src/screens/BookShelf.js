import React, {Component} from 'react';
import {View} from 'react-native';
import Downloads from '../views/Downloads';
import TabViews from '../views/TabViews';
import {color} from '../configs';
export default class BookShelf extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: color.BackGround}}>
        <TabViews>
          <View tabLabel={{label: 'Татсан'}}>
            <Downloads navigation={this.props.navigation} />
          </View>
          <View tabLabel={{label: 'Авах жагсаалт'}}></View>
        </TabViews>
      </View>
    );
  }
}
