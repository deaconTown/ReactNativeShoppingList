import React, { useState, useEffect } from 'react'
import { View, Alert, FlatList, StyleSheet, Button, TextInput } from 'react-native'
import AddItem from '../../AddItem'
import ListItem from '../ListItem/ListItem';
import { ScrollView } from 'react-native-gesture-handler';
import InsertShoppingList from '../../../database/InsertShoppingList/InsertShoppingList';

export default function CreateNewShoppingList(props: any) {
    const [items, setItems] = useState([]);
    const [listName, setListName] = useState('');
    const [listToSend, setListToSend] = useState<Partial<ListModel>>({});

    const insert : InsertShoppingList = new InsertShoppingList(props);

    const itemExists = (name: string) => {
        return items.some(function (item: ContentModel) {
            return item.name.toUpperCase() === name.toUpperCase();
        });
    }; //end of itemExists

    const addItem = (text: string, qty: string) => {
        if (itemExists(text)) {
            Alert.alert('Item already exist');
        }
        else {

            if (!text) {
                Alert.alert('Please enter an item');
            }
            else {
                setItems(prevItems => {
                    return [{ id: Math.random(), name: text, qty }, ...prevItems]
                });

            }
        }
    }

    const deleteItem = (id: string) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    };

    const onChangeName = (name: any) => setListName(name);

    const addNewShoppingList = (item: ContentModel[]) => {
        let content: ContentModel[] = [];
        item.map(x => {
            content.push(x)
            
        })
        let listItem : ListModel = {
            id: Math.random().toString(),
            title: listName || "Quick List",
            isMeal: false
        };

        setListToSend(listItem); //not working

        // insertShoppingListToDb(listItem.id, listItem.title, listItem.isMeal);

        insert.insertShoppingListToDb(listItem.id, listItem.title, items, listItem.isMeal);
        
        return true;
    }

    const goToShoppingList = () => {
        // console.log("listToSend", listToSend)
        // addNewShoppingList(items);
        props.navigation.navigate('Shopping List', addNewShoppingList(items));
        

    }

    return (
        <View>
            <ScrollView>
                <TextInput placeholder='Enter New List Name'
                    style={styles.input}
                    onChangeText={onChangeName}
                    autoCapitalize="words"
                    autoCorrect={true}
                    autoCompleteType="name"
                    // autoFocus= {true}
                    keyboardType="default"
                    defaultValue='Quick List' //TODO: Not working
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
                        goToShoppingList()
                    }
                />
            </ScrollView>
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