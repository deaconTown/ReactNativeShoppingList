import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native'
import MealHandler from '../MealHandler';


export default function MealDetail(props: any) {
    const [meal, setMeal] = useState([]);
    const [ingredients, setIngredients] = useState(['']);
    const [measurements, setMeasurements] = useState(['']);
    const [ingrAmount, setIngrAmount] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const mealHandler = new MealHandler();
    // const str = Object(strIngredient1);

    //get meal by id
    useEffect(() => {
        mealHandler.FilterMealById(props.route.params.mealId).then((response) => {
            if (response) {
                setMeal(response.data.meals)
                setLoading(false);

                //place ingredients & measurement in a separate array
                getIngredients(response.data.meals);
                getMeasurements(response.data.meals);
               
            }
        });
    }, [])

    const getIngredients = (meal: []) => {
        meal.map((x) => {
            const key = Object.keys(x); 
            console.log("Ingredients test") 
            var ingredientKey = key.filter(i => i.includes("strIngredient"));
            var tempIngr: string[] = [];

            ingredientKey.forEach(element => {
                // console.log("element", element)
                // tempIngr = x[element].filter(x => x != )
                if(x[element]){
                    // console.log("x[element]", x[element])
                    tempIngr.push(x[element]);
                }
            });                    
            setIngredients(tempIngr);
            console.log("ingredients", ingredients)
        })
    }
    
    const getMeasurements = (meal: []) => {
        meal.map((x) => {
            const key = Object.keys(x); 
            console.log("Measurement test") 

            var tempMeasurement: string[] = [];

            var measurementKey = key.filter(i => i.includes("strMeasure"));
            measurementKey.forEach(element => {
                if(x[element]){
                    // console.log("x[element]", x[element])
                    tempMeasurement.push(x[element]);
                }
            });
            setMeasurements(tempMeasurement)
            console.log("measurements", measurements)
        })
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
                                <Text>Meal Id: {item.idMeal}</Text>
                                <Text>Meal Name: {item.strMeal}</Text>
                                <Text>Meal Area: {item.strArea}</Text>
                                <Text>Category: {item.strCategory}</Text>
                                <Text>Tags: {item.strTags}</Text>
                                <View>
                                    <Image source={{ uri: item.strMealThumb, height: 300, width: 345 }} style={{ borderColor: 'black', borderWidth: 1 }} />
                                </View>
                                {/* Instructions */}
                                <Text>Instructions:</Text>
                                <Text>{item.strInstructions}</Text>

                                {/* Ingredients */}
                                <Text>Ingredients</Text>
                                <Text>{item['strIngredient1']} {item.strMeasure1}</Text>
                                <Text>{item.strIngredient2} {item.strMeasure2}</Text>
                                <Text>{item.strIngredient3} {item.strMeasure3}</Text>
                                <Text>{item.strIngredient4} {item.strMeasure4}</Text>
                                <Text>{item.strIngredient5} {item.strMeasure5}</Text>
                                <Text>{item.strIngredient6} {item.strMeasure6}</Text>
                                <Text>{item.strIngredient7} {item.strMeasure7}</Text>
                                <Text>{item.strIngredient8} {item.strMeasure8}</Text>
                                <Text>{item.strIngredient9} {item.strMeasure9}</Text>
                                <Text>{item.strIngredient10} {item.strMeasure10}</Text>
                                <Text>{item.strIngredient11} {item.strMeasure11}</Text>
                                <Text>{item.strIngredient12} {item.strMeasure12}</Text>
                                <Text>{item.strIngredient13} {item.strMeasure13}</Text>
                                <Text>{item.strIngredient14} {item.strMeasure14}</Text>
                                <Text>{item.strIngredient14} {item.strMeasure14}</Text>
                                <Text>{item.strIngredient15} {item.strMeasure15}</Text>
                                <Text>{item.strIngredient16} {item.strMeasure16}</Text>
                                <Text>{item.strIngredient17} {item.strMeasure17}</Text>
                                <Text>{item.strIngredient18} {item.strMeasure18}</Text>
                                <Text>{item.strIngredient19} {item.strMeasure19}</Text>
                                <Text>{item.strIngredient20} {item.strMeasure20}</Text>

                                {/* Youtube link: */}
                                <Text style={{ color: 'blue', marginBottom: 50 }} onPress={() => Linking.openURL(item.strYoutube)} > YouTube Tutorial</Text>
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
    }
});