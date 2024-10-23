import React, { useState } from 'react';
import './card.css';
import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import { useAuthContext } from '../hooks/useAuthContext';

const RecipeDetails = ({ recipe, fav }) => {
    const { user } = useAuthContext();
    const [isFavourite, setIsFavourite] = useState(fav);

    const handleClick = async () => {
        const response = await fetch(`/api/favourites/${recipe.id}`, {
            method: (!isFavourite)?'POST':'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            setIsFavourite((prevFavourite) => !prevFavourite);
        }
    };

    return (
        <div className="card">
            <div className="card-image">
                <img src={recipe.imageUrl} alt={recipe.title} />
            </div>
            <div className="card-content">
                <p className="category">{recipe.category}</p>
                <h3 className="name">{recipe.title}</h3>
                {user && (
                    <button className="favorite-button" onClick={handleClick}>
                        <Icon path={isFavourite ? mdiHeart : mdiHeartOutline} size={1} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default RecipeDetails;
