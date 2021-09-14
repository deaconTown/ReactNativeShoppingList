import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    addItem: (text: string, qty: string) => void,
    isEdit?: boolean,
    listItem?: ContentModel,
    name?: string
}

const AddItem = (props: Props) => {
    const [itemName, setItemName] = useState('');
    const [itemQty, setItemQty] = useState(1);

    const onChangeName = (name: any) => setItemName(name);
    const onChangeQty = (qty: any) => setItemQty(qty);

    return (
        <View>
            <TextInput placeholder={props.isEdit ? 'Edit Item' : 'Add New Item'}
                style={styles.input}
                onChangeText={onChangeName}
                autoCapitalize="words"
                autoCorrect={true}
                autoCompleteType="name"
                autoFocus={true}
                keyboardType="default"
                defaultValue={props.isEdit && props.listItem?.name ? props.listItem?.name : ''}
            />
            <TextInput placeholder={props.isEdit ? 'Edit Item Quantity' : 'Add Item Quantity'} //should only accept number
                style={styles.input}
                onChangeText={onChangeQty}
                keyboardType="numbers-and-punctuation"
                defaultValue={props.isEdit && props.listItem?.qty ? props.listItem?.qty : ''}
            />
            <TouchableOpacity style={styles.btn} onPress={() => props.addItem(itemName, itemQty.toString())}>
                <Text style={styles.btnText}>
                    <Ionicons name={props.isEdit ? 'md-create' : 'md-add'} size={20} />{props.isEdit ? " Update Item" : " Add Item"}
                </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.btn} onPress={() => setIsEdit(false)}> */}


            {props.isEdit ?
                <TouchableOpacity style={styles.btn} onPress={() => { }}>
                    <Text style={styles.btnText}>
                        Cancel Edit
                    </Text>
                </TouchableOpacity>
                :
                null
            }

        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 8,
        margin: 5
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default AddItem;