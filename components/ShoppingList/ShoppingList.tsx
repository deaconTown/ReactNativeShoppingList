import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, Button } from 'react-native';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import ListItem from '../ListItem/ListItem';


const ShippingList = (props : any) => {
  const [items, setItems] = useState([
    { id: Math.random(), name: 'Milk', qty: 1 },
    { id: Math.random(), name: 'Bread2', qty: 2 },
    { id: Math.random(), name: 'Eggs', qty: 12 },
    { id: Math.random(), name: 'Juice', qty: 3 }
  ]);

  const [movie, setMovie] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const deleteItem = (id: any) => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  };

  const itemExists = (name: string) =>{
    return items.some(function(item) {
      return item.name.toUpperCase() === name.toUpperCase();
    }); 
  }
   
  const addItem = (text: string, qty: number) => {
  if(itemExists(text)){
      Alert.alert('Error', 'Item already exist');
    }
    else{

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

  const createNewList = () => {
    props.route.params.ingredientNames
    props.route.params.measurements
  } 

  return (
    <>
    {/* <Button title="Meals" onPress={()=> props.navigation.navigate('Meals')}/> */}
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
      <AddItem addItem={addItem} />

<FlatList style={styles.flatList} data={items} renderItem={({ item }) => (
  <ListItem
    item={item}
    deleteItem={deleteItem}
  />
)}
  keyExtractor={item => item.id.toString()} />
      </View>
      
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    minHeight:100,
    position: 'relative',
  },
  body: {
    marginTop: 10,
    padding: 24
  },
  flatList:{
    position: 'relative',
    display: 'flex',
  }
});

export default ShippingList;