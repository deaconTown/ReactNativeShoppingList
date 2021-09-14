import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingList, { CreateNewShoppingList } from '../components/ShoppingList';

export default function ShoppingListNavigator() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator >
            <Stack.Screen name="Shopping List" component={ShoppingList} options={{headerShown:false}}/>
            <Stack.Screen name='New Shopping List' component={CreateNewShoppingList} />
        </Stack.Navigator>
    )
}
