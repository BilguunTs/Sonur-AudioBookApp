import React from 'react';
//import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home';
//import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/Details/bookdetail';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DownloadsScreen from '../screens/Downloads';
import CustomTabBar from '../layout/custom/TabBarNavigation';
import GPlayer from '../screens/AudioPlayer';
import Icon from 'react-native-vector-icons/Ionicons';
import {withGlobalContext} from '../context'
const Root = createStackNavigator();
const BottomNavigator = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <BottomNavigator.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <BottomNavigator.Screen
        name="Home"
        options={{
          title: 'Нүүр',
          tabBarIcon: (e) => (
            <Icon
              name="md-home"
              size={e.focused ? 25 : 20}
              color={e.focused ? '#A491FF' : '#C6B9FF'}
            />
          ),
        }}
        component={HomeScreen}
      />
      {/* <BottomNavigator.Screen
        name="Search"
        options={{
          title: 'Хайх',
          tabBarIcon: (e) => (
            <Icon
              name="md-search"
              size={e.focused ? 25 : 20}
              color={e.focused ? '#A491FF' : '#C6B9FF'}
            />
          ),
        }}
        component={SearchScreen}
      /> */}
      <BottomNavigator.Screen
        name="Downloads"
        options={{
          title: 'Татсан',
          tabBarIcon: (e) => (
            <Icon
              name="md-download"
              size={e.focused ? 25 : 20}
              color={e.focused ? '#A491FF' : '#C6B9FF'}
            />
          ),
        }}
        component={DownloadsScreen}
      />
      <BottomNavigator.Screen
        name="Profile"
        options={{
          title: 'Бүртгэл',
          tabBarIcon: (e) => (
            <Icon
              name="md-person"
              size={e.focused ? 25 : 20}
              color={e.focused ? '#A491FF' : '#C6B9FF'}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </BottomNavigator.Navigator>
  );
};
const RootNavigator = () => (
  <Root.Navigator headerMode="none">
    <Root.Screen name="Main" component={BottomTabs} />
    <Root.Screen name="BookDetail" component={DetailScreen} />
  </Root.Navigator>
);
const MainRoot = (_props)=>{
return <><NavigationContainer>
  <RootNavigator {..._props}/>
</NavigationContainer>
 {_props.global.stats.gplayer.isActive&& <GPlayer/>}
</>
}

export const AppNavigator = withGlobalContext(MainRoot)
