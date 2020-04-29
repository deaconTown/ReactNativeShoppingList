import React, {useState, useEffect} from 'react'
import { View, FlatList, ActivityIndicator, Text } from 'react-native';

export default function Meals() {
    const [meal, setMeal] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://reactnative.dev/movies.json')
          .then((response) => response.json())
          .then((json) => setMeal(json.movies))
          .catch((error) => console.error(error))
          .finally(() =>  setLoading(false));
      }, []);
    
      console.log(meal)

    return (
        <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={meal}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}
    </View> 
    )
}

