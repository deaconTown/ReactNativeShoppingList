import * as React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Button, FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import MealHandler from "../MealHandler";
import { Ionicons } from '@expo/vector-icons';
import Meals from "../Meals";

export default function SearchMealByName(props: any) {
    const [meals, setMeals] = useState([]);
    const [showMeals, setShowMeals] = useState(false);
    const [noMeal, setNoMealAvailable] = useState(false);
    const [name, setName] = useState('');
    const [isLoading, setLoading] = useState(true);
    const mealHandler = new MealHandler();

    //get meal by name
    const getMeal = () => {
        mealHandler.GetMealByName(name).then((response) => {
            if (response) {
                setMeals(response.data.meals);
                setShowMeals(true);
                setLoading(false);               
            }
            if (meals == null) {
                setNoMealAvailable(true);
                console.log("Meals is null")
                setShowMeals(false)
            }
            // else {
            //     setNoMealAvailable(false);
            //     setShowMeals(false)
            //     console.log("Meals is not null")
            // }
            console.log(noMeal)
        });
    }

    const onReset = () => {
        setName('')
        getMeal()
    }

    const msg = () => {
        // setShowMeals(false)
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
                <>
                    {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                        <>
                            <FlatList
                                style={styles.flatList}
                                data={meals}
                                renderItem={({ item }) => (
                                    <>
                                        <Text style={{ marginTop: 30, marginBottom: 1, }}>Name: {item.strMeal}</Text>
                                        <View style={styles.text}>
                                            <Image source={{ uri: item.strMealThumb, height: 300, width: 345 }} style={{ borderColor: 'black', borderWidth: 1 }} />
                                        </View>
                                        <Text style={{ marginTop: 5, marginBottom: 5, }}>Category: {item.strCategory}</Text>
                                        <Button
                                            title="Go to Details"
                                            onPress={() => {
                                                /* 1. Navigate to the Details route with params */
                                                props.navigation.navigate('Detail', {
                                                    mealId: item.idMeal,
                                                });
                                            }}
                                        />
                                    </>
                                )}
                                keyExtractor={(item, index) => item.idMeal}
                            />
                        </>
                    )}
                </>
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
    flatList: {
        // marginTop: 10,
        padding: 24,
        paddingBottom: 50
    },
    text: {
        marginTop: 30,
        marginBottom: 3,
        margin: 10
    }
});