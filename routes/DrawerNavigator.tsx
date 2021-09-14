import 'react-native-gesture-handler';
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Meals, { SearchMealByName, SearchMealByCategory } from '../components/Meals';
import CategoryNavigator from './CategoryNavigator';

export default function DrawerNavigator(props: any) {


    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName='Meals'>
            <Drawer.Screen name="Meals" component={Meals} />
            <Drawer.Screen name="By Name" component={SearchMealByName} />
            <Drawer.Screen name="By Category" component={CategoryNavigator} />
        </Drawer.Navigator>
    )
}
