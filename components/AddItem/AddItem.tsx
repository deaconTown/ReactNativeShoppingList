import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddItem = (props: any) => {
    const [itemName, setItemName] = useState('');
    const [itemQty, setItemQty] = useState(1);

    const onChangeName = (name: any) => setItemName(name);
    const onChangeQty = (qty: any) => setItemQty(qty);

    return (
        <View>
            <TextInput placeholder='Add Item' 
            style={styles.input} 
            onChangeText={onChangeName}
            autoCapitalize = "words"
            autoCorrect = {true}
            autoCompleteType = "name"
            // autoFocus= {true}
            keyboardType = "default"
            />
            <TextInput placeholder='Add Item Quantity' 
            style={styles.input}
            onChangeText={onChangeQty}
            keyboardType = "numbers-and-punctuation"
            />
            <TouchableOpacity style={styles.btn} onPress={()=> props.addItem(itemName, itemQty)}>
                <Text style={styles.btnText}>
                    <Ionicons name='md-add' size={20} />Add Item
                    </Text>
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