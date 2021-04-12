import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import Header from './components/Header/Header';
import { uuid } from 'uuidv4';
import ListItem from './components/ShoppingList/ListItem/ListItem';
import AddItem from './components/AddItem/AddItem';
// import Navigator from './routes/homeStack/'
import TabNavigator from './routes/TabNavigator';
import StackNavigator from './routes/StackNavigator';
import DrawerNavigator from './routes/DrawerNavigator';
import SQLite from 'react-native-sqlite-storage';
const globalAny:any = global;

// const ReactChart = require("react-native-sqlite-storage");

// globalAny.db = SQLite.openDatabase(
//   {
//     name: 'ShoppingList',
//     location: 'default',
//     createFromLocation: '~ShoppingList.db',
//   },
//   () => { },
//   error => {
//     console.log("ERROR: " + error);
//   }
// );

const App = () => {
  useEffect(() => {
   
    let sqlDb = SQLite.openDatabase(
      {
          name: 'ShoppingList.db',
          location: 'default',
          createFromLocation: 2,
      },
      () =>{
          Alert.alert('Connected with success!');
          console.log("DB connected");
        },
      error => {
        console.log("App db error",error);
      }
    );

  const query = `
  CREATE TABLE IF NOT EXISTS "ShoppingList" (
    "id"	TEXT NOT NULL UNIQUE,
    "title"	TEXT,
    "items"	TEXT,
    "isMeal"	INTEGER,
    PRIMARY KEY("id"),
    FOREIGN KEY("isMeal") REFERENCES "Meal"("id")
    );
    CREATE TABLE IF NOT EXISTS "Meal" (
    "id"	TEXT NOT NULL UNIQUE,
    "name"	TEXT,
    "ingredients"	TEXT,
    "measurements"	TEXT,
    "instructions"	TEXT,
    "category"	TEXT,
    "area"	TEXT,
    "tags"	TEXT,
    "youtubeLink"	TEXT,
    "image"	BLOB,
    PRIMARY KEY("id")
  );  
  )
`;
  //CREATE TABLE IF NOT EXISTS "ListItem" (
    // "id"	TEXT NOT NULL UNIQUE,
    // "name"	TEXT,
    // "qty"	TEXT,
    // PRIMARY KEY("id")

  sqlDb.transaction(tx => {
      tx.executeSql(query,[], (tx, results) => {
          console.log("results",results);
          Alert.alert('Success', 'Shopping List was retrieved.');
      },
      (tx, err) => {
          Alert.alert('Error', 'Shopping List was not retrieved.');
          console.log('Inserting into shopping list table error',err, tx)
      });
  });

  return function cleanup () {
    sqlDb.close();
  } 

  }, []);

  return (
    <View style={styles.container}>
      <StackNavigator />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    minHeight: 100,
    position: 'relative'
  },
  flatList: {
    position: 'relative',
    display: 'flex'
  }
});



export default App;