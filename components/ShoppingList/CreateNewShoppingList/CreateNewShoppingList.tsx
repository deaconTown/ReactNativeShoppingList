import React, { useState } from 'react'
import { View, Alert, FlatList, StyleSheet, Button } from 'react-native'
import AddItem from '../../AddItem'
import ListItem from '../ListItem/ListItem';

export default function CreateNewShoppingList(props: any) {
    const [items, setItems] = useState([
        { id: Math.random(), name: 'Milk', qty: 1 },
        { id: Math.random(), name: 'Bread2', qty: 2 },
        { id: Math.random(), name: 'Eggs', qty: 12 },
        { id: Math.random(), name: 'Juice', qty: 3 }
    ]);

    const itemExists = (name: string) => {
        return items.some(function (item) {
            return item.name.toUpperCase() === name.toUpperCase();
        });
    }; //end of itemExists

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

    const deleteItem = (id: any) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    };


    return (
        <View>
            <AddItem addItem={addItem} />
            <FlatList style={styles.flatList} data={items} renderItem={({ item }) => (
                <ListItem
                    item={item}
                    deleteItem={deleteItem}
                />
            )}
                keyExtractor={item => item.id.toString()} />
            <Button
                title="New Shopping List"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    props.navigation.navigate('Shopping List', {
                        measurement: measurements,
                        ingredientName: ingredientNames,
                        newShoppingList: true
                    });
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        position: 'relative',
        display: 'flex',
    },
});