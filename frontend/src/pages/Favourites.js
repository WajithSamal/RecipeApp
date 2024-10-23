import {useEffect, useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import RecipeDetails from "../components/RecipeDetails";

const Favourites = () => {
    const {user} = useAuthContext();
    const [favourites, setFavourites] = useState(null);

    useEffect(() => {
        const fetchFavourites = async () => {
            const response = await fetch('/api/favourites', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                setFavourites(json);
            }
        };

        if (user) {
            fetchFavourites();
        }
    }, [user]);

    return (
        <div className="Home">
            <div className="recipes">
                {favourites && favourites.map((recipe) => (
                    <RecipeDetails key={recipe.id} recipe={recipe} fav={true}/>
                ))}
            </div>
        </div>
    );
}

export default Favourites;
