const express = require('express')
const {
    getFavourites,
    changeFavourites,
    addFavourites,
    deleteFavourites
} = require('../controllers/favouritesController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/',getFavourites)

router.post('/:id',addFavourites)

router.delete('/:id',deleteFavourites)

router.patch('/',changeFavourites)

module.exports = router
