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

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    //  <NavigationContainer>
    //      <Stack.Navigator initialRouteName="Home">
    //           <Stack.Screen name ='Home' component={ShoppingList} 
    //            options={{
    //               headerTitle: "Home",
    //               headerRight: () => (
    //                 <Button
    //                   onPress={() => alert('This is the Home button!')}
    //                   title="Meals"
    //                   color="black"
    //                 />
    //               ),
    //             }}
    //           />
    //           <Stack.Screen name ='Meals' component={Meals}
    //            options={{
    //               headerTitle: "Meals",
    //               headerRight: () => (
    //                 <Button
    //                   onPress={() => alert('This is the Meal button!')}
    //                   title="Info"
    //                   color="#eee"
    //                 />
    //               ),
    //             }}
    //           />
    //      </Stack.Navigator>
    //  </NavigationContainer>
    //<NavigationContainer>
      <BottomTab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Meals') {
            iconName = focused
              ? 'ios-pizza'
              : 'ios-pizza';
          } else if (route.name === 'Shopping List') {
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
        <BottomTab.Screen name="Shopping List" component={ShoppingList} />
        <BottomTab.Screen name="Meals" component={DrawerNavigator} />
      </BottomTab.Navigator>
    //</NavigationContainer>
  )
}

export default TabNavigator;


