const fetchCategories = require('./fetchCategories')
const fetchRecipes = require('./fetchRecipes')

const fetchData = async ()=> {
    try {
        await fetchCategories;
        console.log('Categories Done');

        await fetchRecipes;
        console.log('Recipes Done');

    } catch (error) {
        console.error('Error in fetching data:', error);
    }
}

module.exports = fetchData()
