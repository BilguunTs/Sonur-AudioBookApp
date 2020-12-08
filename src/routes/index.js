import React from 'react';
//import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home';
//import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/Details/bookdetail';
import SettingsScreen from '../screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BookShelfScreen from '../screens/BookShelf';
import CustomTabBar from '../layout/custom/TabBarNavigation';
import BookLists from '../screens/BookLists';

import {withGlobalContext} from '../context';
const Root = createStackNavigator();
const BottomNavigator = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator headerMode="none" initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="BookLists" component={BookLists} />
    </HomeStack.Navigator>
  );
};
const BottomTabs = () => {
  return (
    <BottomNavigator.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <BottomNavigator.Screen
        name="Home"
        options={{title: 'Нүүр'}}
        component={HomeStackScreens}
      />
      <BottomNavigator.Screen
        name="BookShelf"
        options={{title: 'Тавиур'}}
        component={BookShelfScreen}
      />
      <BottomNavigator.Screen
        name="Profile"
        options={{title: 'Бүртгэл'}}
        component={ProfileScreen}
      />
      <BottomNavigator.Screen
        name="Settings"
        options={{title: 'Тохиргоо'}}
        component={SettingsScreen}
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
const MainRoot = (_props) => {
  return (
    <>
      <NavigationContainer>
        <RootNavigator {..._props} />
      </NavigationContainer>
    </>
  );
};

export const AppNavigator = withGlobalContext(MainRoot);
