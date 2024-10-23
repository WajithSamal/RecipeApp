require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const recipeRoutes = require('./routes/recipes')
const categoryRoutes = require('./routes/categories')
const userRoutes = require('./routes/user')
const favouriteRoutes = require('./routes/favourites')
const fetchData = require('./services/fetchData')


const app = express()

app.use(express.json())

app.use((req,res,next) =>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/recipes', recipeRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/favourites', favouriteRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        fetchData.then(()=>{
            app.listen(process.env.PORT,()=>{
                console.log('Listening')
            })
        })
    })
    .catch((error)=>{
        console.log(error)
    })
