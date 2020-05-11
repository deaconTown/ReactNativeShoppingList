import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet, Text, Image, Button } from "react-native";
import MealHandler from "../MealHandler";
import { ScrollView } from "react-native-gesture-handler";

export default function SearchMealByCategory(props: any) {
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const mealHandler = new MealHandler();

    //get all meal categories with descriptions
    useEffect(() => {
        GetMealCategories()
    }, [])

    const GetMealCategories = () => {
        mealHandler.GetMealCategories().then((response) => {
            if (response) {
                setCategories(response.data.categories)
                setLoading(false)
            }
        });
    };
    
    return (
        <ScrollView>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <FlatList
                    style={styles.flatList}
                    data={categories}
                    renderItem={({ item }) => (
                        <>
                            <Text style={{ marginTop: 30, marginBottom: 1, }}>{item.strCategory}</Text>
                            <View style={styles.text}>
                                <Image source={{ uri: item.strCategoryThumb, height: 300, width: 325 }} style={{ borderColor: 'black', borderWidth: 1 }} />
                            </View>
                            <Text style={{ marginTop: 5, marginBottom: 5, }}>Description: {item.strCategoryDescription}</Text>
                            <Button
                                title={`Go to List of ${item.strCategory} Meals`}
                                onPress={() => {
                                    /* 1. Navigate to the Details route with params */
                                    props.navigation.navigate('Category Result', {
                                        category: item.strCategory,
                                    });
                                }}
                            />
                        </>
                    )}
                    keyExtractor={(item, index) => item.idCategory}
                />)}
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    flatList: {
        // marginTop: 10,
        padding: 24,
        paddingBottom: 50
    },
    text: {
        marginTop: 30,
        marginBottom: 3,
        margin: 10
    }
});