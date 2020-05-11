import React, { useState, useEffect } from 'react'
import DisplayMultipleMeals from '../DisplayMultipleMeals'
import { ScrollView } from 'react-native-gesture-handler'
import MealHandler from '../MealHandler';
import Header from '../../Header/Header';

export default function MealsByCategory(props: any) {
    const [meals, setMeals] = useState([]);
    const mealHandler = new MealHandler();

    //Filter meals by category
    useEffect(() => {
        GetMealByCategory()
    }, [])

    const GetMealByCategory = () => {
        if (props.route.params !== undefined) {

        const {category} = props.route.params;
        
        mealHandler.FiltersMealByCategory(category).then((response) => {
            if (response) {
                setMeals(response.data.meals)
            }
        });
    }
    };

    return (
        <ScrollView>
            {/* //TODO: Might want this to stick at the top when scrolling */}
            <Header title={props.route.params.category}/> 
            <DisplayMultipleMeals meals={meals}/>  
        </ScrollView>         
    )
}
