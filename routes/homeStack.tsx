import 'react-native-gesture-handler';
import React from 'react';
// import { createAppContainer, NavigationContainer } from 'react-navigation';
import ShoppingList from '../components/ShoppingList/ShoppingList'
import Meals from '../components/Meals/Meals';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

const Stack = createStackNavigator();

const Navigator = () => {
    return (
       <NavigationContainer>
           <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name ='Home' component={ShoppingList} 
                 options={{
                    headerTitle: "Home",
                    headerRight: () => (
                      <Button
                        onPress={() => alert('This is the Home button!')}
                        title="Meals"
                        color="black"
                      />
                    ),
                  }}
                />
                <Stack.Screen name ='Meals' component={Meals}
                 options={{
                    headerTitle: "Meals",
                    headerRight: () => (
                      <Button
                        onPress={() => alert('This is the Meal button!')}
                        title="Info"
                        color="#eee"
                      />
                    ),
                  }}
                />
           </Stack.Navigator>
       </NavigationContainer>
    )
}

export default Navigator;
