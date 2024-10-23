import { useEffect, useState } from "react";
import RecipeDetails from '../components/RecipeDetails';
import {useAuthContext} from "../hooks/useAuthContext";

const Home = () => {
    const {user} = useAuthContext()
    const favourites = user?.favourites

    const [recipes, setRecipes] = useState(null);
    const [categories, setCategories] = useState(null);
    const [categorySelected, setCategorySelected] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/categories/');
            const json = await response.json();
            if (response.ok) {
                setCategories(json);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            const url = categorySelected ? `/api/recipes/${categorySelected}` : '/api/recipes/';
            const response = await fetch(url);
            const json = await response.json();
            if (response.ok) {
                setRecipes(json);
            }
        };

        fetchRecipes();
    }, [categorySelected]);

    function categoryChange(title) {
        setCategorySelected(title);
        setRecipes(null)
    }

    return (
        <div>
            <div className="filter-buttons">
                {categories && categories.map((category) => (
                    <button
                        className={(categorySelected?.toString() === category.title) ? "selected-filter-button" : "filter-button"}
                        disabled={(categorySelected?.toString() === category.title)}
                        key={category.id}
                        onClick={() => categoryChange(category.title)}
                    >
                        {category.title}
                    </button>
                ))}
            </div>
            <div className="Home">
                <div className="recipes">
                    {recipes && recipes.map((recipe) => (
                        <RecipeDetails key={recipe.id} recipe={recipe} fav={favourites?.includes(recipe.id)}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
