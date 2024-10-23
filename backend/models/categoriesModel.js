const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
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

module.exports = mongoose.model('Categories', categorySchema)
