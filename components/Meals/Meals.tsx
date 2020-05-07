import React, { useState, useEffect } from 'react'
import { View, FlatList, ActivityIndicator, Text, Image, Linking, StyleSheet, Picker, Button, TouchableOpacity } from 'react-native';
import Header from '../Header/Header';
import MealHandler from './MealHandler';
import alphabet from './alphabet.json'

export default function Meals(props: any) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('')
  const mealHandler = new MealHandler();

  //get list of meal by the firt name
  useEffect(() => {
    mealHandler.FilterMealByFirstLetter("a").then((response) => {
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
        // console.log(meals)
        setLoading(false);
      }
    });
  }

  //TODO: 
    // VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shoulactices like PureComponent, shouldComponentUpdate, etc. Object {
      //   "contentLength": 7152,
      //   "dt": 4342,
      //   "prevDt": 3593,
      // }
 
  return (   
    <View style={styles.container}>
      <Header title='Meals' />
      <TouchableOpacity >
      <View>
        <Picker
          selectedValue={filterValue == ''? 'A': filterValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => updateMealFilter(itemValue)}
        >
          {alphabet.map((s, i) => {
            return <Picker.Item key={i} label={s} value={s} />
          })}
        </Picker>
      </View>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <>
          <FlatList
            style={styles.flatList}
            data={meals}
            renderItem={({ item }) => (
              <>
                <Text style={{marginTop: 30, marginBottom: 1, }}>Name: {item.strMeal}</Text>
                <View style={styles.text}>
                  <Image source={{ uri: item.strMealThumb, height: 300, width: 345 }} style={{ borderColor: 'black', borderWidth: 1 }} />
                </View>
                <Text style={{marginTop: 5, marginBottom: 5, }}>Category: {item.strCategory}</Text>
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
    paddingTop: 40,
    // minHeight: 100,
    position: 'relative',
  },
  flatList: {
    // marginTop: 10,
    padding: 24,
    paddingBottom:50
  },
  text: {
    marginTop: 30,
    marginBottom: 3,
  }
});