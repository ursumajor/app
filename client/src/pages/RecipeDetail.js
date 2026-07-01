import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipe } from '../fetches/recipeFetch';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchRecipe(id);
                setRecipe(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (!recipe || recipe.error) return <div className="container mt-5">Recipe not found.</div>;

    return (
        <div className="container mt-5">
            <h1>{recipe.title}</h1>
            <p>by {recipe.username
                ? <Link to={`/profile/${recipe.username}`}>{recipe.username}</Link>
                : "anonymous"}</p>

            {recipe.image_url && (
                <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    width={"400px"}
                    style={{ objectFit: "cover" }}
                />
            )}

            {recipe.description && <p className="mt-3">{recipe.description}</p>}

            <h3 className="mt-4">Ingredients</h3>
            <ul>
                {(recipe.ingredients || []).map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                ))}
            </ul>

            <h3 className="mt-4">Steps</h3>
            <ol>
                {(recipe.steps || []).map((step, i) => (
                    <li key={i}>{step}</li>
                ))}
            </ol>
        </div>
    );
}

export default RecipeDetail;
