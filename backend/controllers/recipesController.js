const Recipe = require('../models/recipesModel')

const getAllRecipes = async (req,res)=>{
    const recipes = await Recipe.find({})

    res.status(200).json(recipes)
}

const getRecipesByCategory = async (req,res)=>{
    const {category} = req.params

    const recipes = await Recipe.find({category:category})

    res.status(200).json(recipes)
}

module.exports = {
    getAllRecipes,
    getRecipesByCategory
}
