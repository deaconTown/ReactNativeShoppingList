import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListItem = (props : any) => {
    return (
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                <CheckBox></CheckBox>
                <Text style={styles.listItemText}>Name: {props.item.name}</Text>
                <Text style={styles.listItemText}>Amount: {props.item.qty}</Text>
                <Ionicons name="md-trash" size={20} color="firebrick" 
                onPress = {() => props.deleteItem(props.item.id)}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    listItemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listItemText: {
        fontSize: 18,

    }

});

export default ListItem;