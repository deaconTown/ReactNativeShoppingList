import React, {useState, useEffect} from 'react'
import { View, FlatList, ActivityIndicator, Text, Image, Linking, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../Header/Header';

export default function Meals() {
    const [meal, setMeal] = useState([]);
    const [isLoading, setLoading] = useState(true);

    //fetching meals by letter a 
     useEffect(() => {
          const fetchMeal = async () => {
            const result = await axios('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
            setMeal(result.data.meals)
            
          };
          fetchMeal().finally(()=>setLoading(false))
        }, [])
      

    return (
        // <View style={{ flex: 1, padding: 24 }}>
        <View style={styles.container}>
          <Header title='Meals'/>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
        style ={styles.flatList}
          data={meal}         
          renderItem={({ item }) => (
              <>
            <Text>{item.strMeal}</Text>
            <View>

            <Image source={{uri : item.strMealThumb, height: 300, width: 345}} style={{borderColor: 'black', borderWidth: 1}}/>
            </View>
            <Text>{item.strInstructions}</Text>
            <Text>{item.strTags}</Text>
            <Text style={{color: 'blue', marginBottom: 50}} onPress={() => Linking.openURL(item.strYoutube)} > YouTube Tutorial</Text>
            </>
          )}
          keyExtractor={( item , index) => item.idMeal}
        />
      )}
    </View> 
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    minHeight:100,
    position: 'relative'
  },
  flatList:{
    marginTop: 10,
    padding: 24
  }
});