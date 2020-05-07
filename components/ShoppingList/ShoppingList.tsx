import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, Button, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import ListItem from '../ListItem/ListItem';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const ShippingList = (props: any) => {
  const [items, setItems] = useState([
    { id: Math.random(), name: 'Milk', qty: 1 },
    { id: Math.random(), name: 'Bread2', qty: 2 },
    { id: Math.random(), name: 'Eggs', qty: 12 },
    { id: Math.random(), name: 'Juice', qty: 3 }
  ]);
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };
  const [list, setList] = useState([
    [
      // `${Math.random()}`,
      { id: Math.random(), name: 'Milk', qty: 1 },
      { id: Math.random(), name: 'Bread2', qty: 2 },
      { id: Math.random(), name: 'Eggs', qty: 12 },
      { id: Math.random(), name: 'Juice', qty: 3 }
    ],
    [
      // `${Math.random()}`,
      { id: Math.random(), name: 'Bree', qty: 1 },
      { id: Math.random(), name: 'Ghee', qty: 2 },
      { id: Math.random(), name: 'Mouse', qty: 12 },
      { id: Math.random(), name: 'Baking Soda', qty: 3 }
    ]
  ]);

  const content = {
    title: '',
    content: list
  }

  // console.log(shoppingList)
  const a = 
    {
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
  }

// console.log(a)

// a.map((s,i) => {
//   console.log(s.list1)
// })
// console.log()

  const [movie, setMovie] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const deleteItem = (id: any) => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  };

  const itemExists = (name: string) => {
    return items.some(function (item) {
      return item.name.toUpperCase() === name.toUpperCase();
    });
  }

  const addItem = (text: string, qty: number) => {
    if (itemExists(text)) {
      Alert.alert('Error', 'Item already exist');
    }
    else {

      if (!text) {
        Alert.alert('Error', 'Please enter an item');
      }
      else {
        setItems(prevItems => {
          return [{ id: Math.random(), name: text, qty }, ...prevItems]
        });

      }
    }
  }

  // console.log("ingredientNames", props.route.params == undefined ? "dont" : props.route.params.ingredientName)
  // // console.log("measurements",props.route.params.measurement)
  // console.log(props.navigation)
  // console.log(props.route)

  const createNewList = () => {
    if (props.route.params) {
      return <FlatList style={styles.flatList} data={props.route.params.ingredientName} renderItem={({ item }) => (
        <ListItem
          item={item}
          deleteItem={deleteItem}
        />
      )}
        keyExtractor={item => item.id.toString()} />
    }
  }
//TODO: DELETE NO LONGER WORKING
  return (
    <>
      {/* <Button title="Meals" onPress={()=> props.navigation.navigate('Meals')}/> */}
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <AddItem addItem={addItem} />
          {list.map((x) => {
            // console.log(x)
            return (
              <>
                <TouchableOpacity onPress={toggleExpanded}>
                  <View >
                    <Text >Shopping List</Text>
                    {/*Heading of Single Collapsible*/}
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsed} align="center">
                  <FlatList style={styles.flatList} data={x} renderItem={({ item }) => (
                    <ListItem
                      item={item}
                      deleteItem={deleteItem}
                    />
                  )}
                    keyExtractor={item => item.id.toString()} />
                </Collapsible>
              </>
            )
          })}

        {Object.keys(a).map((list, _key) => {
          var b = a[list]
          // console.log(b)
          console.log(b['content'])
          var c = b['content']
          
          // console.log(l[k]['id'])
          // console.log(l[k]['content'])
          // var arr = l[k]['content']
          return <FlatList style={styles.flatList} data={c} renderItem={({ item }) => (
            <ListItem
              item={item}
              deleteItem={deleteItem}
            />
          )}
            keyExtractor={item => item.id} />
        })}
          {/* <FlatList style={styles.flatList} data={items} renderItem={({ item }) => (
            <ListItem
              item={item}
              deleteItem={deleteItem}
            />
          )}
            keyExtractor={item => item.id.toString()} /> */}
        </View>

      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
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

export default ShippingList;