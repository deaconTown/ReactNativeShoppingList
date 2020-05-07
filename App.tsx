import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import Header from './components/Header/Header';
import { uuid } from 'uuidv4';
import ListItem from './components/ListItem/ListItem';
import AddItem from './components/AddItem/AddItem';
// import Navigator from './routes/homeStack/'
import TabNavigator from './routes/TabNavigator';
import StackNavigator from './routes/StackNavigator';
import DrawerNavigator from './routes/DrawerNavigator';


const App = () => {
  
  return (
    <View style={styles.container}>
   <StackNavigator/>
   </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    minHeight:100,
    position: 'relative'
  },
  flatList:{
    position: 'relative',
    display: 'flex'
  }
});

export default App;