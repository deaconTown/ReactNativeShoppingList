import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";

export default function AddList(props: any) {
    const [toggleList, setToggleList] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.data)
    },[])

    const Title = () => {
        return (
            <TouchableOpacity style={styles.btn} onPress={() => setToggleList(!toggleList)}>
                <Text style={styles.btnText}>
                    {props.title}
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
    btn: {
        backgroundColor: '#c2bad8',
        padding: 8,
        margin: 5
    },
});