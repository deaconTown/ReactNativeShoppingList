import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, Text, Image, View, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DisplayMultipleMeals(props: any) {
    const [isLoading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        if(props.meals){
            setLoading(false)
        }
    })

    return (
        <>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <FlatList
                    style={styles.flatList}
                    data={props.meals}
                    renderItem={({ item }) => (
                        <>
                            <Text style={{ marginTop: 30, marginBottom: 1, }}>Name: {item.strMeal}</Text>
                            <View style={styles.text}>
                                <Image source={{ uri: item.strMealThumb, height: 300, width: 345 }} style={{ borderColor: 'black', borderWidth: 1 }} />
                            </View>
                            <Text style={{ marginTop: 5, marginBottom: 5, }}>Category: {item.strCategory}</Text>
                            <Button
                                title="Go to Details"
                                onPress={() => {
                                    /* 1. Navigate to the Details route with params */
                                    navigation.navigate('Detail', {
                                        mealId: item.idMeal,
                                    });
                                }}
                            />
                        </>
                    )}
                    keyExtractor={(item, index) => item.idMeal}
                />)}
        </>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 8,
        margin: 5
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        paddingTop: 40,
        // minHeight: 100,
        position: 'relative',
    },
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