import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, Linking } from 'react-native'
import MealHandler from '../MealHandler';


export default function MealDetail(props: any) {
    const [meal, setMeal] = useState([]);
    const [ingredientNames, setIngredientNames] = useState(['']);
    const [measurements, setMeasurements] = useState(['']);
    const [ingredients, setIngredients] = useState(['']);
    const [isLoading, setLoading] = useState(true);
    const mealHandler = new MealHandler();

    //get meal by id
    useEffect(() => {
        mealHandler.GetMealById(props.route.params.mealId).then((response) => {
            if (response) {
                setMeal(response.data.meals)
                setLoading(false);
                
                getIngredientsList(response.data.meals);
            }
        });
    }, []) 

    const getIngredientsList = (meal: []) => {
        //create temp array to store ingredient names and measurement
        var tempIngr: string[] = [];
        var tempMeasurement: string[] = [];

        meal.map((x) => {
            //get meal keys
            const key = Object.keys(x);

            //filter to get ingredient and measurement keys only
            var ingredientKey = key.filter(i => i.includes("strIngredient"));
            var measurementKey = key.filter(i => i.includes("strMeasure"));

            //add ingredientName to temp array if value is not null
            ingredientKey.forEach(element => {
                if (x[element]) {
                    tempIngr.push(x[element]);
                } 
            });
            //set IngredientNames state ~ might need it at some point //TODO: remove if found not needed
            setIngredientNames(tempIngr);

            //add measurement to temp array if value is not null
            measurementKey.forEach(element => {
                if (x[element]) {
                    tempMeasurement.push(x[element]);
                }
            });
            //set Measurements state ~ might need it at some point //TODO: remove if found not needed
            setMeasurements(tempMeasurement)
        })

        //concat IngredientNames & Measurements, then set Ingredient state to use in flatlist
        var temp: string[] = [];
        for(var i = 0; i < tempIngr.length; i++){
            temp.push(tempIngr[i].concat(' ').concat(tempMeasurement[i]))
        }
        // console.log("ingredients", temp) 
        setIngredients(temp);
    }

    return (
        <View>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <>
                    <FlatList
                        style={styles.flatList}
                        data={meal}
                        renderItem={({ item }) => (
                            <>
                                {/* TODO: The Id should be removed before "Production" */}
                                <Text style={styles.text}>Meal Id: {item.idMeal}</Text>
                                <Text style={styles.text}>Meal Name: {item.strMeal}</Text>
                                <Text style={styles.text}>Meal Area: {item.strArea}</Text>
                                <Text style={styles.text}>Category: {item.strCategory}</Text>
                                <Text style={styles.text}>Tags: {item.strTags}</Text>
                                <View>
                                    <Image source={{ uri: item.strMealThumb, height: 300, width: 345 }} style={{ borderColor: 'black', borderWidth: 1 }} />
                                </View>
                                {/* Instructions */}
                                <Text style={styles.text}>Instructions:</Text>
                                <Text style={styles.text}>{item.strInstructions}</Text>

                                {/* Ingredients */}
                                <Text style={styles.text}>Ingredients:</Text>
                                <FlatList
                                    style={styles.ingredientFlatList}
                                    data={ingredients}
                                    renderItem={({ item }) => (
                                        <Text>{item}</Text>
                                    )}
                                    keyExtractor={(item, index) => item.strIngredient1}
                                /> 

                                {/* Youtube link: */}
                                <Text  style={{ color: 'blue', marginBottom: 50, marginTop: 3 }} onPress={() => Linking.openURL(item.strYoutube)} > YouTube Tutorial</Text>
                            </>
                        )}
                        keyExtractor={(item, index) => item.idMeal}
                    />
                </>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        minHeight: 100,
        position: 'relative'
    },
    flatList: {
        marginTop: 10,
        padding: 24
    },
    ingredientFlatList: {
        marginTop: 2,
        marginBottom: 10,
        // padding: 24
    },
    text:{
        marginTop: 3,
    }
});