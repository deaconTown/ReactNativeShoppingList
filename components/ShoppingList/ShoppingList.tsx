import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import AddList from './AddList';
import ListItem from './ListItem/ListItem';
import { useFocusEffect } from '@react-navigation/native';
import { createDBTables, insertShoppingList, db } from '../../database/ShoppingListDatabase/ShoppingListSchema';
import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('ShoppingList.db');
export default function ShoppingList(props: any) {
  const [isNewList, setIsNewList] = useState(false);
  const [shoppingLists, setShoppingLists] = useState({
    list1: {
      id: Math.random(),
      name: 'List 1',
      content: [
        { id: Math.random(), name: 'Milk', qty: 1 },
        { id: Math.random(), name: 'Bread2', qty: 2 },
        { id: Math.random(), name: 'Eggs', qty: 12 },
        { id: Math.random(), name: 'Juice', qty: 3 }
      ]
    },
    list2: {
      id: Math.random(),
      name: 'List 2',
      content:
        [
          { id: Math.random(), name: 'Bree', qty: 1 },
          { id: Math.random(), name: 'Ghee', qty: 2 },
          { id: Math.random(), name: 'Mouse', qty: 12 },
          { id: Math.random(), name: 'Baking Soda', qty: 3 }
        ]
    }
  });

  // console.log(props.route.params)
  // const db = SQLite.openDatabase('ShoppingList.db');

  React.useEffect(() => {
    // db.transaction(tx => {
    //   tx.executeSql(
    //     "drop table if exists ShoppingLists"
    //   );
    //   tx.executeSql(
    //     "drop table if exists Meals"
    //   );
    // });
    getfromTable();

    //create tables in ShoppingList Database
    db.transaction(tx => {
      tx.executeSql("PRAGMA foreign_keys=on");
      tx.executeSql(`create table if not exists ShoppingLists (id 
          integer not null primary key autoincrement, 
          title nvarchar(50) null,
          items nvarchar(1000) null,
          qty nvarchar(1000) null,
          mealId integer default 0 not null,
          foreign key(mealId) references Meals(mealId) )`);

      tx.executeSql(`CREATE TABLE IF NOT EXISTS Meals
          (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          M_API_Id NVARCHAR(50) NULL,
          name NVARCHAR(50) NULL,
          igredientNames NVARCHAR(50) NULL,
          measurements NVARCHAR(250) NULL,
          instructions NVARCHAR(1000) NULL,
          category NVARCHAR(250) NULL,
          area NVARCHAR(250) NULL,
          tags NVARCHAR(250) NULL,
          youTube_Link NVARCHAR(250) NULL,
          image NVARCHAR(250) NULL)`);
    })

    createDBTables();
    db.transaction(tx => {
      tx.executeSql("select * from Meals", [], (tx, results) => {
        console.log('Meals was selected', results.rows)
      })
      tx.executeSql("select items from ShoppingLists", [], (tx, results) => {
        console.log('ShoppingLists was selected', results.rows)
        // console.log('ShoppingLists.meals was selected', results.rows.)
      }) 
      tx.executeSql("select qty from ShoppingLists", [], (tx, results) => {
        console.log('ShoppingLists was selected', results.rows)
        // console.log('ShoppingLists.meals was selected', results.rows.)
      })
    })

    // createDBTables();
  }, []);



  useEffect(() => {
    if (props.route.params !== undefined) {
      setIsNewList(true)
    }
    createContent();   
    console.log('testing')
    console.log(props.route.params)

  }, [props.route.params]);

  //get props from route and set up values to go into items state
  const createContent = () => {
    var name = [] = [];
    var qty = [] = [];
    var tempContent = [];
    if (props.route.params !== undefined) {
      props.route.params.ingredientName.map((x) => {
        name.push(x);
      })
      props.route.params.measurement.map((x) => {
        qty.push(x);
      })
    }

    for (let index = 0; index < name.length; index++) {
      const n = name[index];
      const q = qty[index];
      tempContent.push({ id: Math.random(), name: n, qty: q });

    }
    if (props.route.params !== undefined) {
      props.route.params.ingredientName.map((x) => {
        name.push(x);
      })
      props.route.params.measurement.map((x) => {
        qty.push(x);
      })
    }

    for (let index = 0; index < name.length; index++) {
      const n = name[index];
      const q = qty[index];
      tempContent.push({ id: Math.random(), name: n, qty: q });

    }

    addNewList(tempContent);
  }; //end of createContent

  //getting items from table
  const getfromTable = () => {
    var res;
    var name = [] = [];
    var qty = [] = [];
    var tempContent = [];

    db.transaction(tx => {
      tx.executeSql("select items from ShoppingLists", [], (tx, results) => {
        console.log('ShoppingLists was selected', results.rows)
        name.push(results.rows)
      }) 
      tx.executeSql("select qty from ShoppingLists", [], (tx, results) => {
        console.log('ShoppingLists was selected', results.rows)
        qty.push(results.rows)
      })
    })  

  for (let index = 0; index < name.length; index++) {
    const n = name[index];
    const q = qty[index];
    tempContent.push({ id: Math.random(), name: n, qty: q });

  }

  addListFromDb(tempContent);
}; 

const addListFromDb = (content: any) => {
  if (content !== undefined) {
    setShoppingLists(previousList => {
      return {
        ...previousList,
        [content.tile]: { //TODO: Need to do check for duplicate eventually
          id: content.id,
          name: content.title,
          content: content //this is not the state
        }
      }
    });
    // insertShoppingList(props.route.params.mealName, props.route.params.ingredientName.toString(), props.route.params.measurement.toString(), props.route.params.mealId);
  }
};//end of addNewList

  const addNewList = (content: any) => {
    if (props.route.params !== undefined) {
      setShoppingLists(previousList => {
        return {
          ...previousList,
          [props.route.params.mealName]: { //TODO: Need to do check for duplicate eventually
            id: Math.random(),
            name: props.route.params.mealName,
            content: content //this is not the state
          }
        }
      });
      insertShoppingList(props.route.params.mealName, props.route.params.ingredientName.toString(), props.route.params.measurement.toString(), props.route.params.mealId);
    }
  };//end of addNewList

  return (
    <>
      {/* <Button title="Meals" onPress={()=> props.navigation.navigate('Meals')}/> */}
      <ScrollView style={styles.container}>
        <Header />
        <View style={styles.body}>
          <Button
            title="New Shopping List"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navigation.navigate('New Shopping List', {
              });
            }}
          />
          {Object.keys(shoppingLists).map((item, _key) => {
            var listItem = shoppingLists[item]
            var lists = listItem['content']
            return <AddList data={lists} title={listItem['name']} fromMealList={isNewList} />
          })}
        </View>
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    minHeight: 100,
    position: 'relative',
  },
  body: {
    marginTop: 10,
    padding: 24
  },
  flatList: {
    position: 'relative',
    display: 'flex',
  }
});