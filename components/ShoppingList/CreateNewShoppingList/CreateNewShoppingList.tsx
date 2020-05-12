import React, { useState, useEffect } from 'react'
import { View, Alert, FlatList, StyleSheet, Button, TextInput } from 'react-native'
import AddItem from '../../AddItem'
import ListItem from '../ListItem/ListItem';

export default function CreateNewShoppingList(props: any) {
    const [items, setItems] = useState([]);
    const [ingredientNames, setIngredientNames] = useState(['']);
    const [measurements, setMeasurements] = useState(['']);
    const [ingredients, setIngredients] = useState(['']);
    const [isLoading, setLoading] = useState(true);
    const [listName, setListName] = useState('');

    useEffect(() => {

        getIngredientsList();

    }, [items])

    const itemExists = (name: string) => {
        return items.some(function (item) {
            return item.name.toUpperCase() === name.toUpperCase();
        });
    }; //end of itemExists

    const addItem = (text: string, qty: string) => {
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

    const getIngredientsList = () => {
        var tempIngr: string[] = [];
        var tempMeasurement: string[] = [];
        items.map((x) => {
            console.log("x", x)
            tempIngr.push(x.name);
            tempMeasurement.push(x.qty.toString());
        });
        setIngredientNames(tempIngr);
        setMeasurements(tempMeasurement);
    }

    const deleteItem = (id: any) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    };

    const onChangeName = (name: any) => setListName(name);

    return (
        <View>
            <TextInput placeholder='Enter New List Name'
                style={styles.input}
                onChangeText={onChangeName}
                autoCapitalize="words"
                autoCorrect={true}
                autoCompleteType="name"
                // autoFocus= {true}
                keyboardType="default"
                defaultValue = 'Quick List' //TODO: Not working
            />
            <AddItem addItem={addItem} />
            <FlatList style={styles.flatList} data={items} renderItem={({ item }) => (
                <ListItem
                    item={item}
                    deleteItem={deleteItem}
                />
            )}
                keyExtractor={item => item.id} />
            <Button
                title="Create New Shopping List"
                onPress={() =>
                    /* 1. Navigate to the Details route with params */
                    props.navigation.navigate('Shopping List', {
                        measurement: measurements,
                        ingredientName: ingredientNames,
                        mealName: listName,
                        newShoppingList: true
                    })
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        position: 'relative',
        display: 'flex'
    },
    input: {
        height: 60,
        padding: 8,
        fontSize: 16
    },
});