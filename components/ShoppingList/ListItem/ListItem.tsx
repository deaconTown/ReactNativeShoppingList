import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DeleteListItem from '../../../database/DeleteListItem';

const ListItem = (props : any) => {
    const [isSelected, setSelection] = useState(false);

    const onCheck = () => {

    }

    const deleteListItem : DeleteListItem = new DeleteListItem(props);

    return (
        <TouchableOpacity style={isSelected? styles.listItemSelected : styles.listItem} disabled={isSelected? true: false}>
            <View style={styles.listItemView}>
                <CheckBox
                value={isSelected}
                onChange={()=>setSelection(!isSelected)}
                />
                <Text style={styles.listItemText}>{props.item.name}</Text>
                <Text style={styles.listItemText}>{props.item.qty}</Text>
                <Ionicons name="md-trash" size={20} color="firebrick" 
                onPress = {() => props.deleteItem(props.item.id)} />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listItemSelected: {
        padding: 15,
        backgroundColor: 'grey',
        borderBottomWidth: 1,
        borderColor: '#eee',
        // position: 'absolute',
        // bottom: 0
    },
    listItemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: 'relative'
    },
    listItemText: {
        fontSize: 18,
    }

});

export default ListItem;