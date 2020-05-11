import React, { useState, useEffect } from 'react'
import { View, FlatList, ActivityIndicator, Text, Image, Linking, StyleSheet, Picker, Button, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../Header/Header';
import MealHandler from './MealHandler';
import alphabet from './alphabet.json'
import DisplayMultipleMeals from './DisplayMultipleMeals';

export default function Meals(props: any) {
  const [meals, setMeals] = useState([]);
  const [filterValue, setFilterValue] = useState('')
  const mealHandler = new MealHandler();

  //get list of meal by the firt name on component mount
  useEffect(() => {
      getMealsByFirstLetter()
  }, [])

  const getMealsByFirstLetter = (letter: string = 'a') => {
    mealHandler.FilterMealsByFirstLetter(letter).then((response) => {
      if (response) {
        setMeals(response.data.meals)
      }
    });
  };

  const updateMealFilter = (itemValue: any) => {
    setFilterValue(itemValue)
    getMealsByFirstLetter(itemValue);
  }

  return (

    <View style={styles.container}>
          <Header title='Meals' />
          {/* <TouchableOpacity > */}
            <View>
              <Picker
                selectedValue={filterValue == '' ? 'A' : filterValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => updateMealFilter(itemValue)}
              >
                {alphabet.map((s, i) => {
                  return <Picker.Item key={i} label={s} value={s} />
                })}
              </Picker>
            </View>
          {/* </TouchableOpacity> */}

      <DisplayMultipleMeals meals={meals} navigation={props.navigation}/>    
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    // minHeight: 100,
    position: 'relative',
  },
  picker: {
    height: 50, 
    width: 100,
    marginLeft: 20
  }
});