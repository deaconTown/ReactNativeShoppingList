import React, { useState, useEffect } from 'react'
import { View, FlatList, ActivityIndicator, Text, Image, Linking, StyleSheet, Picker, Button } from 'react-native';
import axios from 'axios';
import Header from '../Header/Header';
import MealHandler from './MealHandler';

export default function Meals(props: any) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('')
  const mealHandler = new MealHandler();

  //get list of meal by the firt name
  useEffect(() => {
    mealHandler.FilterMealByFirstLetter(filterValue).then((response) => {
      if (response) {
        setMeals(response.data.meals)
        setLoading(false);
      }
    });
  }, [])

  const updateMealFilter = (itemValue: any) => {
    setFilterValue(itemValue)
    mealHandler.FilterMealByFirstLetter(itemValue).then((response) => {
      if (response) {
        setMeals(response.data.meals)
        setLoading(false);
      }
    });
  }


  return (
    <View style={styles.container}>
      <Header title='Meals' />
      <View>
        <Picker
          selectedValue={filterValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => updateMealFilter(itemValue)}
        >
          <Picker.Item label="A" value="a" />
          <Picker.Item label="B" value="b" />
        </Picker>
      </View>


      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <>
          <FlatList
            style={styles.flatList}
            data={meals}
            renderItem={({ item }) => (
              <>
                <Text>{item.strMeal}</Text>
                <View>
                  <Image source={{ uri: item.strMealThumb, height: 300, width: 345 }} style={{ borderColor: 'black', borderWidth: 1 }} />
                </View>
                <Text>{item.strInstructions}</Text>
                <Text>{item.strTags}</Text>
                <Text style={{ color: 'blue', marginBottom: 50 }} onPress={() => Linking.openURL(item.strYoutube)} > YouTube Tutorial</Text>
                <Button
                  title="Go to Details"
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    props.navigation.navigate('Detail', {
                      mealId: item.idMeal,
                    });
                  }}
                />
              </>
            )}
            keyExtractor={(item, index) => item.idMeal}
          />
        </>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    minHeight: 100,
    position: 'relative'
  },
  flatList: {
    marginTop: 10,
    padding: 24
  }
});