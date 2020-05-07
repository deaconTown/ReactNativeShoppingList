import * as React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import MealHandler from "../MealHandler";
import { Ionicons } from '@expo/vector-icons';

export default function SearchMealByName(props: any) {
    const [meal, setMeal] = useState([]);
    const [name, setName] = useState('');
    const [isLoading, setLoading] = useState(true);
    const mealHandler = new MealHandler();

    //get meal by name
    const getMeal = () => {
        mealHandler.GetMealByName(name).then((response) => {
            if (response) {
                setMeal(response.data.meals)
                setLoading(false);
            }
        });
    }

    const onChangeName = (name: any) => setName(name);

    return (
        <View>
            <TextInput placeholder='Add Item'
                style={styles.input}
                onChangeText={onChangeName}
                autoCapitalize="words"
                autoCorrect={true}
                autoCompleteType="name"
                keyboardType="default"
            />
             <TouchableOpacity style={styles.btn} onPress={getMeal}>
                <Text style={styles.btnText}>
                    <Ionicons name='md-search' size={20} />Add Item
                    </Text>
            </TouchableOpacity>

            
        </View>
    )
}

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