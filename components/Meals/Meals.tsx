import React, {useState, useEffect} from 'react'
import { View, FlatList, ActivityIndicator, Text, Image, Linking,  } from 'react-native';
import axios from 'axios'

export default function Meals() {
    const [meal, setMeal] = useState([]);
    const [isLoading, setLoading] = useState(true);

     useEffect(() => {
          const fetchMeal = async () => {
            const result = await axios('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
            // setMeal(result.data)
            setMeal(result.data.meals)
            console.log("result.data.meals", result.data.meals)        
            
          };
          fetchMeal().finally(()=>setLoading(false))
        }, [])
      

    return (
        <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
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
}

