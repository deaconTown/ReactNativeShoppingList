import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, Button, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import AddList from './AddList';
import ListItem from './ListItem/ListItem';

export default function  ShoppingList(props: any){
  const [items, setItems] = useState([
    { id: Math.random(), name: 'Milk', qty: 1 },
    { id: Math.random(), name: 'Bread2', qty: 2 },
    { id: Math.random(), name: 'Eggs', qty: 12 },
    { id: Math.random(), name: 'Juice', qty: 3 }
  ]);
  const [content, setContent] = useState();
  const [fromMealList, setfromMealList] = useState(false);

  const [list, setList] = useState({
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


  // setPerson(prevPerson => {
  //   return { 
  //     ...prevPerson, 
  //     age: prevPerson.age + 1 
  //   }
  // })


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
    console.log(tempContent)
    // setContent(tempContent)
    
    addNewList(tempContent);
  };

  const addNewList = (content: any) => {
    if (props.route.params !== undefined) {
      setList(previousList => {
        return {
          ...previousList,
          list3: {
            id: Math.random(),
            name: props.route.params.mealName,
            content:content //this is not the state
          }
        }
      })
    }
  }


  useEffect(() => {

    if (props.route.params !== undefined) {
      setfromMealList(true)
    }

    createContent()

  }, []);


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

  return (
    <>
      {/* <Button title="Meals" onPress={()=> props.navigation.navigate('Meals')}/> */}
      <ScrollView style={styles.container}>
        <Header />
        <View style={styles.body}>
          <AddItem addItem={addItem} />
          {Object.keys(list).map((item, _key) => {
            var listItem = list[item]
            var content = listItem['content']
            return <AddList data={content} title={listItem['name']} fromMealList={fromMealList}/>
          })}
        </View>
      </ScrollView>
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