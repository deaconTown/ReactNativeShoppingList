import React, { useState, useEffect } from 'react'
import { View, Alert, FlatList, StyleSheet, Button, TextInput } from 'react-native'
import AddItem from '../../AddItem'
import ListItem from '../ListItem/ListItem';
import { ScrollView } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

interface ListModel {
    id: string,
    name: string,
    content: ContentModel[]
}

interface ContentModel {
    id: number,
    name: string,
    qty: number
}

export default function CreateNewShoppingList(props: any) {
    const [items, setItems] = useState([]);
    const [ingredientNames, setIngredientNames] = useState(['']);
    const [measurements, setMeasurements] = useState(['']);
    const [ingredients, setIngredients] = useState(['']);
    const [isLoading, setLoading] = useState(true);
    const [listName, setListName] = useState('');
    const [listToSend, setListToSend] = useState<Partial<ListModel>>({});

    // useEffect(() => {

    //     // getIngredientsList();
    //     console.log("items", items)

    // }, [items])

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

    // const getIngredientsList = () => {
    //     var tempIngr: string[] = [];
    //     var tempMeasurement: string[] = [];
    //     items.map((x) => {
    //         tempIngr.push(x.name);
    //         tempMeasurement.push(x.qty.toString());
    //     });
    //     setIngredientNames(tempIngr);
    //     setMeasurements(tempMeasurement);
    // }

    const deleteItem = (id: number) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    };
   

    //   SQLite.openDatabase({name:'users', createFromLocation:1}, this.connected, this.failed)

    const connected= () =>{
        Alert.alert('Connected with success !')
      }
    
    const failed= (e) =>{
        Alert.alert('Something went wrong !', `${e}`)
      }
    
      const insertShoppingListToDb = (id: string, title: string, items: ContentModel[], isMeal: boolean) => new Promise((resolve, reject) => {
        const sqlDb = SQLite.openDatabase(
            {
                name: 'ShoppingList.db',
          location: 'default',
          createFromLocation: 2,
            },
            () =>{
                // Alert.alert('Connected with success!');
                console.log("DB connected");
              },
            error => {
              console.log("CreateNewShoppingList db error",error);
            }
          );
        const shoppingListQuery = "INSERT INTO ShoppingList (id, title, isMeal) values (?,?,?)";
        // INSERT INTO ShoppingList(id, title, items, isMeal) values ("testId2","testTitle2","testItems2",0)
        // const query = "SELECT * FROM ";
        const shoppingListparams = [id, title, isMeal];
        const listItemparams = [Math.random.toString(), "test", "qty", id];
    
        sqlDb.transaction(tx => {
            tx.executeSql(shoppingListQuery,shoppingListparams, (tx, results) => {
                console.log("inserted into shopping list table");
                // console.log("results",results);
                // Alert.alert('Success', 'Shopping List was saved.');
                insertListItemsToDb(id, items);
            },
            (tx, err) => {
                // Alert.alert('Error', 'Shopping List was not saved.');
                console.log('Inserting into shopping list table error',err, tx)
            });
        });
    });

    const insertListItemsToDb = (id: string, items: ContentModel[]) => new Promise((resolve, reject) => {
        const sqlDb = SQLite.openDatabase(
            {
                name: 'ShoppingList.db',
                location: 'default',
                createFromLocation: 2,
            },
            () =>{
                // Alert.alert('Connected with success for list item!');
                console.log("Success","DB connected for listitem");
              },
            error => {
              console.log("CreateNewShoppingList ListItem db error",error);
            }
          );

        const listItemQuery = "INSERT INTO ListItem (id, name, qty, shoppingListId) values (?,?,?,?)";

        items.forEach(x => {
            const listItemparams = [x.id, x.name, x.qty, id];

            sqlDb.transaction(tx => {
                tx.executeSql(listItemQuery,listItemparams, (tx, results) => {
                    // console.log("listItem results",results);
                    // Alert.alert('Success', 'item was saved.');
                   console.log('Success', 'item was saved.');
                },
                (tx, err) => {
                    // Alert.alert('Error', 'item were not saved.');
                    console.log('Inserting into listItem table error',err, tx)
                });
            });
        })
        
    });



    const onChangeName = (name: any) => setListName(name);

    const createListToSend = (item: ContentModel[]) => {
        let content: ContentModel[] = [];
        item.map(x => {
            content.push(x)
            
        })
        let listItem : ListModel = {
            id: Math.random().toString(),
            name: listName || "Quick List",
            content: content
        };

        setListToSend(listItem); //not working

        insertShoppingListToDb(listItem.id, listItem.name, listItem.content, false);
        return listItem;
    }

    const goToShoppingList = () => {
        console.log("listToSend", listToSend)
        props.navigation.navigate('Shopping List', createListToSend(items));
        

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