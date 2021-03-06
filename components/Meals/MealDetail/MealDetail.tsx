import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, Linking, Button, ScrollView } from 'react-native'
import MealHandler from '../MealHandler';
interface ListModel {
    id: string,
    name: string,
    content: ContentModel[]
}
interface ContentModel {
    id: number,
    name: string,
    qty: string
}
interface Props {
     
}

export default function MealDetail(props: any) {
    const [meal, setMeal] = useState([]);
    const [ingredientNames, setIngredientNames] = useState(['']);
    const [measurements, setMeasurements] = useState(['']);
    const [ingredients, setIngredients] = useState(['']);
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState<ContentModel[]>([]);
    const mealHandler = new MealHandler();

    //get meal by id
    useEffect(() => {
        mealHandler.GetMealById(props.route.params.mealId).then((response) => {
            if (response) {
                setMeal(response.data.meals)
                setLoading(false);

                getIngredientsList(response.data.meals);
                // console.log("meal", response.data.meals)  
            }
        });
    }, [])

    const createListToSend = (meal: any) => {

        let listItem : ListModel = {
            id: meal.idMeal.toString(),
            name: meal.strMeal.toString(),
            content: content
        };        

        return listItem;
    }

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
            //set IngredientNames state 
            setIngredientNames(tempIngr);

            //add measurement to temp array if value is not null
            measurementKey.forEach(element => {
                if (x[element]) {
                    tempMeasurement.push(x[element]);
                }
            });
            //set Measurements state 
            setMeasurements(tempMeasurement)
        })

        //concat IngredientNames & Measurements, then set Ingredient state to use in flatlist ~ might need it at some point //TODO: remove if found not needed
        var temp: string[] = [];
        for (var i = 0; i < tempIngr.length; i++) {
            temp.push(tempIngr[i].concat(' ').concat(tempMeasurement[i]))
        }
        console.log("ingredients", temp) 
        setIngredients(temp);

        let contentList: ContentModel[] = [];
        for (var i = 0; i < tempIngr.length; i++) {
            contentList.push({id: Math.random(), name : tempIngr[i], qty : tempMeasurement[i]})
        } 

        setContent(contentList);
    }

    const goToShoppingList = (item: any) => {        
        props.navigation.navigate('Shopping List', createListToSend(item));        
    }

    return (
        <ScrollView key={Math.random()}>
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
                                <Text style={{ color: 'blue', marginBottom: 50, marginTop: 3 }} onPress={() => Linking.openURL(item.strYoutube)} > YouTube Tutorial</Text>
                                <Button
                                    title="Send To ShoppingList"
                                    onPress={() => {
                                        /* 1. Navigate to the Details route with params */
                                        goToShoppingList(item);
                                        meal: true
                                    }}
                                />
                            </>
                        )}
                        keyExtractor={(item, index) => item.idMeal}
                    />
                </>
            )}
        </ScrollView>
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
    text: {
        marginTop: 3,
    }
});