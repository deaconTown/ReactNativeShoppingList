import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import { Ionicons } from '@expo/vector-icons';

export default function AddList(props: any) {
    const [toggleList, setToggleList] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.data);//TODO: Set Limit to 10 list max eventually
    }, [])

    const Title = () => {
        return (
            <TouchableOpacity style={styles.btn} onPress={() => setToggleList(!toggleList)}>
                <Text style={props.fromMealList ? styles.btnTextWithIcon : styles.btnText}>{props.title} </Text>
                <Text>
                    {props.fromMealList ?
                        <>
                            <Text>
                                <Ionicons name="md-checkmark-circle-outline" size={20} color="firebrick"
                                    onPress={() => props.navigation.navigate('Home')} />
                            </Text>
                            <Text>
                                <Ionicons name="md-close" size={20} color="firebrick"
                                    onPress={() => { }} />
                            </Text>
                        </>
                        :
                        <Text > </Text>
                    }
                </Text>
            </TouchableOpacity>
        )
    }

    const deleteItem = (id: any) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    };

    return (
        <>
            {Title()}
            {toggleList ?
                <View>
                    <FlatList style={styles.flatList} data={items} renderItem={({ item }) => (
                        <ListItem
                            item={item}
                            deleteItem={deleteItem}
                        />
                    )}
                        keyExtractor={item => item.id} />
                </View>
                :
                <Text ></Text>
            }
        </>
    )
}

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
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    },
    btnTextWithIcon: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'left'
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 8,
        margin: 5
    },
});