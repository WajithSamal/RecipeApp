const axios = require('axios')
const Category = require('../models/categoriesModel')

const fetchCategories = async ()=> {
    try {
        const existingData = await Category.find()
        if (existingData.length === 5) {
            console.log('Categories are Fetched already in Database')
            return;
        }
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        const apiData = response.data.categories;
        if (Array.isArray(apiData)) {
            const categories = apiData.slice(0,5)
            for (const item of categories) {
                const newData = new Category({
                    id:item.idCategory,
                    title: item.strCategory,
                    imageUrl: item.strCategoryThumb,
                    description: item.strCategoryDescription
                });
                await newData.save()
            }
            console.log('Categories Added to Database')
        }
    } catch (error) {
        console.error('Error Categories data from API:', error)
    }
}

module.exports = fetchCategories()
