const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
    id:{
        type:Number,
        required:true,
        unique: true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    ytUrl:{
        type:String
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps : true})

module.exports = mongoose.model('Recipes', recipeSchema)
