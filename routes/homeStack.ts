import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import ShoppingList from '../components/ShoppingList/ShoppingList'
import Meals from '../components/Meals/Meals';

const screens = {
    Home: {
        screen: ShoppingList
    },
    Meals: {
        screen: Meals
    }
}

/* FOR RESOLVING NAVIGATION ISSUE 
https://www.youtube.com/watch?v=cS4PgI3zBzY - WAS USING V4 AND I WAS GETTING ISSUES
https://reactnavigation.org/docs/getting-started
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context (i THINK THIS PART WAS WHAT RESOLVED IT)

FROM THE SITE

[even though this is expo, i believe this was what got it to work as this was the last thing i installed]
Installing dependencies into a bare React Native project
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

Installing dependencies into an Expo managed project: 
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
*/

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);