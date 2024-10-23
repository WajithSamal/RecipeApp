const express = require('express')
const getAllCategories = require('../controllers/categoriesController')

const router = express.Router()

router.get('/',getAllCategories)

// router.get('/:id',(req,res)=>{
//     res.json({message : 'Get category by id'})
// })

module.exports = router
