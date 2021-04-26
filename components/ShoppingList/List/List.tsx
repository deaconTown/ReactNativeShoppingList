import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, Alert } from "react-native";
import { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

interface Props {
    data : any,
    title : string,
    fromMealList: boolean,
    id: string,
    deleteItem: (id: string) => void;
    deleteShoppingList: (id: string) => void;
}

export default function List(props: Props) {
    const [toggleList, setToggleList] = useState(false);
    const [items, setItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        // console.log("props.data", props.data)
        setItems(props.data);//TODO: Set Limit to 10 list max eventually
    }, [props.data])

    const Title = () => {
        return (
            <TouchableOpacity style={styles.btn} onPress={() => setToggleList(!toggleList)}>
                <Text style={props.fromMealList ? styles.btnTextWithIcon : styles.btnText}>{props.title} </Text>
                <Text>
                    {props.fromMealList ?
                        <>
                            <Text>
                                <Ionicons name="md-checkmark-circle-outline" size={20} color="firebrick"
                                    onPress={() => navigation.navigate('Home')} />
                            </Text>
                            <Text>
                                <Ionicons name="md-close" size={20} color="firebrick"
                                    onPress={() => { }} />
                            </Text>
                        </>
                        :
                        <>
                            <Text>
                                <Ionicons name="md-close" size={20} color="firebrick"
                                    onPress={() => props.deleteShoppingList(props.id)} />
                            </Text>
                        </>
                    }
                </Text>
            </TouchableOpacity>
        )
    }

    const deleteItem = (id: string) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    };

    return (
        <>
            {Title()}
            {toggleList ?
                <View>
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList style={styles.flatList} data={items} renderItem={({ item }) => (
                            <ListItem
                                item={item}
                                deleteItem={props.deleteItem}
                            />
                        )}
                            keyExtractor={item => item.id} />
                    </SafeAreaView>
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