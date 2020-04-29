import React, {useState, useEffect} from 'react'
import { View, FlatList, ActivityIndicator, Text, Image,  } from 'react-native';

export default function Meals() {
    const [meal, setMeal] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
          .then((response) => response.json())
          .then((json) => setMeal(json.meals))
          .catch((error) => console.error(error))
          .finally(() =>  setLoading(false));
      }, []);
    
    //   console.log(meal)

    return (
        <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={meal}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
              <>
            <Text>{item.strMeal}</Text>
            
            <Image source={{uri : item.strMealThumb}}/>
            <Text>{item.strInstructions}</Text>
            <Text>{item.strYoutube}</Text>
            </>
          )}
        />
      )}
    </View> 
    )
}

