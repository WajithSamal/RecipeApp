const Recipe = require('../models/recipesModel')
const User = require('../models/userModel')


const getFavourites = async (req,res)=>{
    const recipeIDlist = req.user.favourites
    if(recipeIDlist.length===0){
        return res.status(200).json(null)
    }

    const recipes = []

    for(const id of recipeIDlist){
        const recipe = await Recipe.findOne({id:id})
        recipes.push(recipe)
    }

    res.status(200).json(recipes)
}

const changeFavourites = async (req,res)=>{
    const uid = req.user._id
    const user = await User.findOneAndUpdate({_id:uid},{
        favourites:req.body.favourites
    })

    res.status(200).json({favourites: user.favourites})
}

const addFavourites = async (req, res) => {
    const { id } = req.params;
    const uid = req.user._id;

    try {

        const user = await User.findOneAndUpdate(
            { _id: uid },
            { $push: { favourites: id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteFavourites = async (req, res) => {
    const { id } = req.params;
    const uid = req.user._id;

    try {
        const user = await User.findOneAndUpdate(
            { _id: uid },
            { $pull: { favourites: id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getFavourites,
    changeFavourites,
    addFavourites,
    deleteFavourites
}
