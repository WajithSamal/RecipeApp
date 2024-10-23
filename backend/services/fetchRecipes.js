const axios = require('axios')
const Recipe = require('../models/recipesModel')
const Category = require("../models/categoriesModel");

const fetchRecipes = async ()=> {
    try {
        const existingData = await Recipe.find()
        if (existingData.length >= 75) {
            console.log('All Recipes Fetched already in Database')
            return;
        }
        const categories = (await Category.find()).map((category)=>{
            return category.title
        })
        const recipeIdList = []
        for (const category of categories){
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+category)
            recipeIdList.push(...response.data.meals.slice(0,15).map((meal)=>{
                return meal.idMeal
            }))
        }
        for (const id of recipeIdList){
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id.toString())
            const apiData = response.data.meals[0]
            if (apiData){
                const newData = new Recipe({
                    id:apiData.idMeal,
                    title: apiData.strMeal,
                    category: apiData.strCategory,
                    area: apiData.strArea,
                    ytUrl: apiData.strYoutube,
                    imageUrl: apiData.strMealThumb,
                    description: apiData.strInstructions
                });
                await newData.save()
            }
        }

        console.log('Recipes Fetched to DB')

    } catch (error) {
        console.error('Error fetching Recipes from API:', error)
    }
}

module.exports = fetchRecipes()
