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
          console.log("DB connected from app.tsx");
        },
      error => {
        console.log("App db error from app.tsx",error);
      }
    );

  let MealTableQuery = `
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
`;
let ShoppingListQuery = `
  CREATE TABLE IF NOT EXISTS "ShoppingList" (
    "id"	TEXT NOT NULL UNIQUE,
    "title"	TEXT,
    "isMeal"	INTEGER,
    PRIMARY KEY("id"),
    FOREIGN KEY("isMeal") REFERENCES "Meal"("id")
    );
`;
let ListItemTableQuery = `
CREATE TABLE IF NOT EXISTS "ListItem" (
	"id"	TEXT NOT NULL UNIQUE,
	"name"	TEXT,
	"qty"	TEXT,
	"shoppingListId"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("shoppingListId") REFERENCES "ShoppingList"("id")
);
`;

  sqlDb.transaction(tx => {
      tx.executeSql(MealTableQuery,[], (tx, results) => {
        console.log("Success", "Meal table created",results);
      },
      (tx, err) => {
          console.error('Error', 'Meal table',err, tx)
      });

      tx.executeSql(ShoppingListQuery,[], (tx, results) => {
        console.log("Success", "ShoppingList table created",results);
    },
    (tx, err) => {
      console.error('Error', 'ShoppingList table',err, tx)
    });

    tx.executeSql(ListItemTableQuery,[], (tx, results) => {
      console.log("Success", "ListItem table created",results);
  },
  (tx, err) => {
    console.error('Error', 'ListItem table',err, tx)
  });
  });

  let tables = ['ShoppingList', 'Meal', 'ListItem'];

  tables.forEach(table => {
    sqlDb.transaction(tx => {
      tx.executeSql("select DISTINCT tbl_name from sqlite_master where tbl_name = '"+table+"'",[], (tx, results) => {
    
      if(results.rows.length > 0 ){
           console.log(table + " exits");
      }else{
          console.log(table + " does not exits");
      }
      //alert(DataBase.tabelaExiste);
  })  
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