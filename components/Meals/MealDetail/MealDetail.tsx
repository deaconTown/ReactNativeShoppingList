import * as React from 'react';
import { View, Text } from 'react-native'

export default function MealDetail(props: any) {

    return (
        <View>
            <Text> {props.route.params.mealId}</Text>
            <Text>Hello World</Text>
        </View>
    )
}
