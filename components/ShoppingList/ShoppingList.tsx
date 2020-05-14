import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import AddList from './AddList';
import ListItem from './ListItem/ListItem';
import { useFocusEffect } from '@react-navigation/native';

export default function ShoppingList(props: any) {
  const [fromMealList, setfromMealList] = useState(false);
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

  useEffect(() => {

    if (props.route.params !== undefined) {
      setfromMealList(true)
    }
    createContent()
    console.log('testing')
    console.log(props.route.params)

  }, [props.route.params]);

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

    addNewList(tempContent);
  }; //end of createContent

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
      })
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
            return <AddList data={lists} title={listItem['name']} fromMealList={fromMealList} />
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