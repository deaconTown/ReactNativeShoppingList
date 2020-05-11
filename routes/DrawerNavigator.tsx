import 'react-native-gesture-handler';
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Meals, { SearchMealByName } from '../components/Meals';

export default function DrawerNavigator(props: any) {


    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName='Meals'>
            <Drawer.Screen name="Meals" component={Meals} />
            <Drawer.Screen name="Name Search" component={SearchMealByName} />
        </Drawer.Navigator>
    )
}
