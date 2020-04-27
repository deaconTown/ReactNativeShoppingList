import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Header from './components/Header/Header';
import { uuid } from 'uuidv4';
import ListItem from './components/ListItem/ListItem';
import AddItem from './components/AddItem/AddItem';

const App = () => {
  const [items, setItems] = useState([
    { id: Math.random(), name: 'Milk', qty: 1 },
    { id: Math.random(), name: 'Bread', qty: 2 },
    { id: Math.random(), name: 'Eggs', qty: 12 },
    { id: Math.random(), name: 'Juice', qty: 3 }
  ]);
  const [isEdit, setisEdit] = useState(false);

  const [selectedItem, setselectedItem] = useState({});

  const editItem = (id: any, name: string, qty: string, isEdit: boolean) => {
    // setItems(prevItems => {
    //   return prevItems.filter(item => item.id != id);
    // });
    setselectedItem({id, name, qty});
    setisEdit(isEdit);
    console.log("Edit pressed");
  };

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

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addItem={addItem} editItem={selectedItem} isEdit={isEdit}/>
      <FlatList data={items} renderItem={({ item }) => (
        <ListItem
          item={item}
          deleteItem={deleteItem}
          editItem = {editItem}
        />
      )}
        keyExtractor={item => item.id.toString()} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60
  },
});

export default App;