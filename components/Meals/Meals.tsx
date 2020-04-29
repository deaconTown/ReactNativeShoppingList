import React, {useState, useEffect} from 'react'
import { View, FlatList, ActivityIndicator, Text, Image, Linking,  } from 'react-native';

export default function Meals() {
    const [meal, setMeal] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
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
            <View>

            <Image source={{uri : item.strMealThumb, height: 300, width: 500}}/>
            </View>
            <Text>{item.strInstructions}</Text>
            <Text>{item.strTags}</Text>
            <Text style={{color: 'blue', marginBottom: 50}} onPress={() => Linking.openURL(item.strYoutube)} > YouTube Tutorial</Text>
            </>
          )}
        />
      )}
    </View> 
    )
}

