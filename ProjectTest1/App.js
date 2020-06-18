import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainScreen from './src/MainScreen';
import ItemList from './src/ItemList';


const AppNavigator = createStackNavigator(  
  {  
    MainScreen: {
      screen: MainScreen,
      navigationOptions : {
              header: null,
        }
    },
    ItemList: {
      screen: ItemList,
      navigationOptions : {
              header: null,
        }
    }  
    
  },  
  {  
      initialRouteName: "MainScreen"  
  }  
);  

const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {  
  render() {  
      return <AppContainer />;  
  }  
}  


