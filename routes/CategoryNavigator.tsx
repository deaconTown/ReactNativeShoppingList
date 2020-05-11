import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SearchMealByCategory from '../components/Meals/SearchMealByCategory';
import MealsByCategory from '../components/Meals/SearchMealByCategory/MealsByCategory';

export default function CategoryNavigator() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator >
            <Stack.Screen name="Categories" component={SearchMealByCategory} />
            <Stack.Screen name='Category Result' component={MealsByCategory} />
        </Stack.Navigator>
    )
}
