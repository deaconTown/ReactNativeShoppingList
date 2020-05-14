import 'react-native-gesture-handler';
import React from 'react';
// import { createAppContainer, NavigationContainer } from 'react-navigation';
import ShoppingList from '../components/ShoppingList/ShoppingList'
import Meals from '../components/Meals/Meals';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import MealDetail from '../components/Meals/MealDetail/MealDetail';
import { SearchMealByName } from '../components/Meals';
import { AddList } from '../components/ShoppingList';
import MealsByCategory from '../components/Meals/SearchMealByCategory/MealsByCategory';
import CreateNewShoppingList from '../components/ShoppingList/CreateNewShoppingList';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const BottomTab = createBottomTabNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name='Home' component={TabNavigator}  options={{headerShown:false}}/>
                {/* <Stack.Screen name='Meal' component={Meals} /> */}
                <Stack.Screen name='Detail' component={MealDetail} />  
                <Stack.Screen name='AddList' component={AddList} />
                {/* <Stack.Screen name='New Shopping List' component={CreateNewShoppingList} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    ) 
}

export default StackNavigator;


