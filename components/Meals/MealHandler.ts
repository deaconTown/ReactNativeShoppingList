import React, { Component } from 'react'
import axios from 'axios';
import { Alert } from 'react-native';

export class MealHandler {

    FilterMealsByFirstLetter = async (letter: string) => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    GetMealById = async (id: string) => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    GetMealByName = async (name: string) => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    GetRandomMeal = async () => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    GetMealCategories = async () => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    GetAllCategoryList = async () => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    GetAllArea = async () => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    GetAllIngredients = async () => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    FilterMealsByMainIngredient = async (ingredient: string) => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    FiltersMealByCategory = async (category: string) => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    FilterMealsByArea = async (area: string) => {
        try {
            return await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    AddPreviewMealImage = async () => {
        try {
            return await axios.get(`https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    GetIngredientImageThumbnail = async (ingredient: string) => {
        try {
            return await axios.get(`https://www.themealdb.com/images/ingredients/${ingredient}.png`);
        } catch (error) {
            Alert.alert(error)
        }
    };

    

}

export default MealHandler







