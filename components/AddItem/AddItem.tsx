import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddItem = (props: any) => {
    const [itemName, setItemName] = useState('');
    const [itemQty, setItemQty] = useState(1);
    const [isEdit, setIsEdit] = useState(props.isEdit);

    const onChangeName = (name: any) => setItemName(name);
    const onChangeQty = (qty: any) => setItemQty(qty);

    console.log("props.isEdit", props.isEdit)
    console.log("isEdit", isEdit)



    return (
        <View>
            <TextInput placeholder={isEdit ? 'Edit Item' : 'Add New Item'}
                style={styles.input}
                onChangeText={onChangeName}
                autoCapitalize="words"
                autoCorrect={true}
                autoCompleteType="name"
                autoFocus={true}
                keyboardType="default"
                defaultValue={isEdit ? props.editItem.name : ''}
            />
            <TextInput placeholder={props.isEdit ? 'Edit Item Quantity' : 'Add Item Quantity'} //should only accept number
                style={styles.input}
                onChangeText={onChangeQty}
                keyboardType="numbers-and-punctuation"
                defaultValue={isEdit ? props.editItem.qty : ''}
            />
            <TouchableOpacity style={styles.btn} onPress={() => props.addItem(itemName, itemQty)}>
                <Text style={styles.btnText}>
                    <Ionicons name={isEdit ? 'md-create' : 'md-add'} size={20} />{props.isEdit ? "Update Item" : "Add Item"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setIsEdit(false)}>

                {isEdit ?
                    <Text style={styles.btnText}>
                        Cancel Edit
                </Text>
                    :
                    <Text >
                    
            </Text>
                }
            </TouchableOpacity>
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