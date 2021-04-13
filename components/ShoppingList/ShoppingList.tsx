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
interface ShoppingListModel {
  id: string,
  title: string,
  items: ContentModel[],
  isMeal: boolean
}
interface ListModel {
  id: string,
  title: string,
  isMeal: boolean
}

interface ContentModel {
  id: string,
  name: string,
  qty: string,
  shoppingListId: string
}

export default function ShoppingList(props: any) {
  const [shoppingList, setShoppingList] = useState<ShoppingListModel[]>();
  const [listContent, setListContent] = useState<ContentModel[]>();
  const [list, setList] = useState<ListModel[]>();

  useEffect(() => {
    if (props.route.params !== undefined) {
      addNewList(props.route.params); // TODO: SHOULD CHANGE TO GET ALL EXISTING LISTS
    }
    // retrieve lists from db;   
    let sqlDb = SQLite.openDatabase(
      {
        name: 'ShoppingList.db',
        location: 'default',
        createFromLocation: 2,
      },
      () =>{
          // Alert.alert('Connected with success!');
          console.log("DB connected [retrieve shoppingList]");
        },
      error => {
        console.log("ShoppingList db error",error);
      }
    );

  const shoppingListquery = "SELECT * from ShoppingList;";
  const listItemQuery = "SELECT * from ListItem;";

  sqlDb.transaction(tx => {
      tx.executeSql(shoppingListquery,[], (tx, results) => {
        let dataLength = results.rows.length;   

        if(dataLength > 0) {
          let helperArray :ListModel[] = [] ;
          for (let index = 0; index < dataLength; index++) {
            let data = results.rows.item(index);    
            
            let listItem : ListModel = {
              id: data.id,
              title:  data.title,
              isMeal: data.isMeal
          };
            helperArray.push(listItem);
          }
          setList(helperArray);
          console.log("list state updated");
        }          
          // console.log("shoppingList screen results.rows.item",results.rows.item);
          // Alert.alert('Success', 'Shopping List was retrieved.');
          console.log("DB connected [retrieve listItem]");
      },
      (tx, err) => {
          // Alert.alert('Error', 'Shopping List was not retrieved.');
          console.log('Inserting into shopping list table error',err, tx)
      });

      //get list items from db
      tx.executeSql(listItemQuery,[], (tx, results) => {
        let dataLength = results.rows.length;   

        if(dataLength > 0) {
          let helperArray :ContentModel[] = [] ;
          for (let index = 0; index < dataLength; index++) {
            let data = results.rows.item(index);   
            
            let listItem : ContentModel = {
              id: data.id,
              name: data.name,
              qty: data.qty, 
              shoppingListId: data.shoppingListId
          };
            helperArray.push(listItem);
          }
          setListContent(helperArray);
          console.log("listContent state updated");
        }          
        console.log("Success", "list table retrieved");
        // console.log("Success", "list table retrieved",results);
        // console.log("List items",results.rows.item(0));
      },
      (tx, err) => {
          console.error('Error', 'list table not retrieved',err, tx)
      });
  });

  

  console.log("list in effect", list);
  console.log("listContent in effect", listContent);
  }, []);
  //end of use effect

  useEffect(() => {
    console.log("list in effect 2", list);
  console.log("listContent in effect 2", listContent);
    if(list && listContent){

      setUpShoppingList(list, listContent);
    }
  }, [])

  const setUpShoppingList = (shoppingList: ListModel[], contentList: ContentModel[]) => {
    shoppingList.forEach(element => {
      let helperArray :ShoppingListModel[] = [] ;
          for (let index = 0; index < shoppingList.length; index++) {
            // let data = shoppingList.rows.item(index);    
            
            let listItem : ShoppingListModel = {
              id: shoppingList[index].id,
              title: shoppingList[index].title,
              items: contentList.filter(x => x.shoppingListId === shoppingList[index].id),
              isMeal: shoppingList[index].isMeal
              
          };
            helperArray.push(listItem);
          }
          // console.log('listContent',listContent)
          console.log('helperArray',helperArray)
          setShoppingList(helperArray);
    });
  }

  const addNewList = (content: ShoppingListModel) => {
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

            shoppingList?.map((x, key) => {
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