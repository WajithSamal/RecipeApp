const express = require('express')
const {
    getAllRecipes,
    getRecipesByCategory
} = require('../controllers/recipesController')

const router = express.Router()

router.get('/',getAllRecipes)

router.get('/:category',getRecipesByCategory)

module.exports = router
