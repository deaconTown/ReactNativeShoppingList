import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import List from './List';
import ListItem from './ListItem/ListItem';
import { useFocusEffect } from '@react-navigation/native';
import { createDBTables, insertShoppingList, db } from '../../database/ShoppingListDatabase/ShoppingListSchema';
import SQLite from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase('ShoppingList.db');
interface ListModel {
  id: string,
  title: string,
  items: ContentModel[],
  isMeal: boolean
}

interface ContentModel {
  id: number,
  name: string,
  qty: number
}

export default function ShoppingList(props: any) {
  const [list, setList] = useState<ListModel[]>();
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: Math.random().toString(),
      name: 'List 1',
      content: [
        { id: Math.random(), name: 'Milk', qty: 1 },
        { id: Math.random(), name: 'Bread2', qty: 2 },
        { id: Math.random(), name: 'Eggs', qty: 12 },
        { id: Math.random(), name: 'Juice', qty: 3 }
      ]
    },
    {
      id: Math.random().toString(),
      name: 'List 2',
      content:
        [
          { id: Math.random(), name: 'Bree', qty: 1 },
          { id: Math.random(), name: 'Ghee', qty: 2 },
          { id: Math.random(), name: 'Mouse', qty: 12 },
          { id: Math.random(), name: 'Baking Soda', qty: 33 }
        ]
    }
  ]);

  useEffect(() => {
    if (props.route.params !== undefined) {
      addNewList(props.route.params); // TODO: SHOULD CHANGE TO GET ALL EXISTING LISTS
    }
    // createContent();   
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
        console.log("ShoppingList db error",error);
      }
    );
  // const insertStatement = "INSERT INTO ShoppingList (id, title, items, isMeal) values (?,?,?,?)";
  // INSERT INTO ShoppingList(id, title, items, isMeal) values ("testId2","testTitle2","testItems2",0)
  const query = "SELECT * from ShoppingList;";

  sqlDb.transaction(tx => {
      tx.executeSql(query,[], (tx, results) => {

        let dataLength = results.rows.length;       

        if(dataLength > 0) {
          let helperArray :ListModel[] = [] ;
          for (let index = 0; index < dataLength; index++) {
            // console.log("row",results.rows.item(index));
            let data = results.rows.item(index);    
            // console.log("data.items",data.items);
            
            let listItem : ListModel = {
              id: data.id,
              title:  data.title,
              items: data.items,
              isMeal: data.isMeal
          };
          // console.log("listItem",listItem.items);
          // console.log("listItem substring",listItem.items.toString().substring(1, listItem.items.toString().length-1));
          let formattedItems = listItem.items.toString().substring(1, listItem.items.toString().length-1);
          console.log("formattedItems", formattedItems)
          // let itemsArr = formattedItems.split("");
          // console.log("itemsArr",itemsArr[0]);
          for (let index = 0; index < listItem.items.length; index++) {
            // console.log("listItem.items[index]",listItem.items[index]);
          }


            helperArray.push(listItem);
          }

          // console.log("helperArray",helperArray);

          setList(helperArray);
        }

          
          console.log("shoppingList screen results.rows.item",results.rows.item(0));
          Alert.alert('Success', 'Shopping List was retrieved.');
      },
      (tx, err) => {
          Alert.alert('Error', 'Shopping List was not retrieved.');
          console.log('Inserting into shopping list table error',err, tx)
      });
  });

  }, [props.route.params]);

  const addNewList = (content: ListModel) => {
    if (content !== undefined) {

      // setShoppingLists(previousList => [...previousList, content]);

      // <InsertIntoShoppingListTable id={content.id} title={content.name} items={content.content.toString()} isMeal={false}/>

      // insertShoppingList(props.route.params.mealName, props.route.params.ingredientName.toString(), props.route.params.measurement.toString(), props.route.params.mealId);
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
          {

            list?.map((x, key) => {
              // console.log("list",x.items.toString(), x.id, x.title);
              return <List data={x.items} title={x.title} fromMealList={false} id={x.id} key={key} />
            })

          }
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