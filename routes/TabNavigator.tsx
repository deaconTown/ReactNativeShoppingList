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
import { MealDetail } from '../components/Meals';
import StackNavigator from './StackNavigator';
import DrawerNavigator from './DrawerNavigator';
import ShoppingListNavigator from './ShoppingListNavigator';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
      <BottomTab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Meals') {
            iconName = focused
              ? 'ios-pizza'
              : 'ios-pizza';
          } else if (route.name === 'ShoppingListNav') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName ? iconName: ''} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
        <BottomTab.Screen name="ShoppingListNav" component={ShoppingListNavigator} options={{title: 'Shopping List'}}/>
        <BottomTab.Screen name="Meals" component={DrawerNavigator} />
      </BottomTab.Navigator>
  )
}

export default TabNavigator;


