import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import List from './List';
import ListItem from './ListItem/ListItem';
import { useFocusEffect } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import DeleteListItem from '../../database/DeleteListItem';

export default function ShoppingList(props: any) {
  const [shoppingList, setShoppingList] = useState<ShoppingListModel[]>();
  const [listContent, setListContent] = useState<ContentModel[]>();
  const [list, setList] = useState<ListModel[]>();

  useEffect(() => {
    getShoppingLists();
    getListItems();
    // return () => {
    //   cleanup
    // }

    console.log("list?.length", list?.length);
    console.log("listContent?.length", listContent?.length);

    //TODO: you can use useMemo() for values or useCallback() for functions 

  }, [list?.length, listContent?.length, props.route.params]);

  const deleteListItem: DeleteListItem = new DeleteListItem(props);

  const setUpShoppingList = (shoppingList: ListModel[], contentList: ContentModel[]) => {
    console.log("setting up shopping list");
    shoppingList.forEach(element => {
      let helperArray: ShoppingListModel[] = [];
      for (let index = 0; index < shoppingList.length; index++) {

        let listItem: ShoppingListModel = {
          id: shoppingList[index].id,
          title: shoppingList[index].title,
          items: contentList.filter(x => x.shoppingListId === shoppingList[index].id),
          isMeal: shoppingList[index].isMeal

        };
        helperArray.push(listItem);
      }
      setShoppingList(helperArray);
    });
    console.log("shoppingList updated");
  }

  const getShoppingLists = () => {
    // retrieve shoppingLists from db;   
    let sqlDb = SQLite.openDatabase(
      {
        name: 'ShoppingList.db',
        location: 'default',
        createFromLocation: 2,
      },
      () => {
        // Alert.alert('Connected with success!');
        console.log("DB connected [retrieve shoppingList]");
      },
      error => {
        console.log("ShoppingList db error", error);
      }
    );

    const shoppingListquery = "SELECT * from ShoppingList;";

    sqlDb.transaction(tx => {
      tx.executeSql(shoppingListquery, [], (tx, results) => {
        let dataLength = results.rows.length;

        if (dataLength > 0) {
          let helperArray: ListModel[] = [];
          for (let index = 0; index < dataLength; index++) {
            let data = results.rows.item(index);

            let listItem: ListModel = {
              id: data.id,
              title: data.title,
              isMeal: data.isMeal
            };
            helperArray.push(listItem);
          }
          setList(helperArray);
          console.log("list state updated");
        }
        console.log("DB connected [retrieve listItem]");
      },
        (tx, err) => {
          console.log('Inserting into shopping list table error', err, tx)
        });
    });
  }
  //end of getShoppingList

  const getListItems = () => {
    // retrieve lists from db;   
    let sqlDb = SQLite.openDatabase(
      {
        name: 'ShoppingList.db',
        location: 'default',
        createFromLocation: 2,
      },
      () => {
        console.log("DB connected [retrieve shoppingList]");
      },
      error => {
        console.log("ShoppingList db error", error);
      }
    );

    const listItemQuery = "SELECT * from ListItem;";

    sqlDb.transaction(tx => {
      //get list items from db
      tx.executeSql(listItemQuery, [], (tx, results) => {
        let dataLength = results.rows.length;

        if (dataLength > 0) {
          let helperArray: ContentModel[] = [];
          for (let index = 0; index < dataLength; index++) {
            let data = results.rows.item(index);

            let listItem: ContentModel = {
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
        if (list && listContent) {
          setUpShoppingList(list, listContent);
        }
      },
        (tx, err) => {
          console.error('Error', 'list table not retrieved', err, tx)
        });
    });
  }//end of getListItems

  const removeListItem = (id: string) => {
    deleteListItem.DeleteItemFromListQuery(id, true);

    let filteredListContent = listContent?.filter((c) => c.id !== id);

    setListContent(filteredListContent);

  }

  const removeShoppingList = (id: string) => {
    deleteListItem.DeleteShoppingListQuery(id, listContent);

    let filteredShoppingList = shoppingList?.filter((s) => s.id !== id);

    setShoppingList(filteredShoppingList);

  };

  const goToEditShoppingList = (id: string, name: string) => {
    props.navigation.navigate('New Shopping List',
      {
        isEdit: true,
        shoppingListId: id,
        listContent: listContent,
        shoppingListName: name
      });
  }

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
              return <List
                data={x.items}
                title={x.title}
                fromMealList={false}
                id={x.id} key={key}
                editShoppingList={goToEditShoppingList}
                deleteItem={removeListItem}
                deleteShoppingList={removeShoppingList} />
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