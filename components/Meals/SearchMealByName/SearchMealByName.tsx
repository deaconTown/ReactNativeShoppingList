import * as React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Button, FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import MealHandler from "../MealHandler";
import { Ionicons } from '@expo/vector-icons';
import Meals from "../Meals";
import DisplayMultipleMeals from "../DisplayMultipleMeals";

export default function SearchMealByName(props: any) {
    const [meals, setMeals] = useState([]);
    const [showMeals, setShowMeals] = useState(false);
    const [noMeal, setNoMealAvailable] = useState(false);
    const [name, setName] = useState('');
    const mealHandler = new MealHandler();

    //get meal by name
    const getMeal = () => {
        mealHandler.GetMealByName(name).then((response) => {
            if (response) {
                setMeals(response.data.meals);
                setShowMeals(true);
                // setLoading(false);               
            }
            if (meals == null) {
                setNoMealAvailable(true);
                console.log("Meals is null")
                setShowMeals(false)
            }
            console.log(noMeal)
        });
    }

    //TODO: the below is not doing anything at the moment
    const onReset = () => {
        setName('')
        getMeal()
    }

    const msg = () => {
        if (noMeal) {
            console.log("We are sorry to say we have no meal with that name.")
            return (<>
            <Text style={styles.text}>
                We are sorry to say we have no meal with that name.
            </Text>
            <Button
            title="Reset"
            onPress={() => onReset()}
        />
        </>
            )
        }
        else {
            return <View>
                <Text style={styles.text}>
                    Please go ahead and search for a meal.
                </Text>
                <Text style={styles.text}>
                    You can get a random selection of meals if you search without a name.
                </Text>
            </View>
        }
        
    };

    const onChangeName = (name: any) => setName(name);

    return (
        <View style={styles.container}>
            <TextInput placeholder='Please enter a name'
                style={styles.input}
                onChangeText={onChangeName}
                autoCapitalize="words"
                autoCorrect={true}
                autoCompleteType="name"
                keyboardType="default"
                //TODO:how to clear text onclick
            />
            <TouchableOpacity style={styles.btn} onPress={getMeal}>
                <Text style={styles.btnText}>
                    <Ionicons name='md-search' size={20} /> Search Meals
                    </Text>
            </TouchableOpacity>
            {showMeals ?                
                    <DisplayMultipleMeals meals={meals}/>                
                :
              msg()
            }
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
    },
    container: {
        flex: 1,
        paddingTop: 40,
        // minHeight: 100,
        position: 'relative',
    },
    text: {
        marginTop: 30,
        marginBottom: 3,
        margin: 10
    }
});