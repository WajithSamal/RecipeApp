const Category = require('../models/categoriesModel')

const getAllCategories = async (req,res)=>{
    const categories = await Category.find({})

    res.status(200).json(categories)
}

module.exports = getAllCategories
