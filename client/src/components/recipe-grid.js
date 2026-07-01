import React from 'react';
import { Link } from 'react-router-dom';

const RecipeGrid = ({ recipes, emptyMessage = "No recipes yet." }) => {
    if (!recipes || recipes.length === 0) {
        return <p>{emptyMessage}</p>;
    }

    return (
        <div className="d-flex flex-wrap">
            {recipes.map((recipe) => (
                <Link
                    key={recipe.id}
                    to={`/recipes/${recipe.id}`}
                    className="m-2 text-decoration-none text-dark"
                >
                    {recipe.image_url && (
                        <img
                            src={recipe.image_url}
                            alt={recipe.title}
                            width={"250px"}
                            height={"250px"}
                            style={{ objectFit: "cover" }}
                        />
                    )}
                    <h3>{recipe.title}</h3>
                    {recipe.username && <p>by {recipe.username}</p>}
                </Link>
            ))}
        </div>
    );
}

export default RecipeGrid;
