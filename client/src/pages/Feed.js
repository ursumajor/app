import React, { useEffect, useState } from 'react';
import { fetchAllRecipes } from '../fetches/recipeFetch';
import RecipeGrid from '../components/recipe-grid';

const Feed = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                setRecipes(await fetchAllRecipes());
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <div className="container mt-5">Loading recipes...</div>;

    return (
        <div className="container">
            <h1 className="mt-5">Recipes</h1>
            <RecipeGrid
                recipes={recipes}
                emptyMessage="No recipes yet. Be the first to share one!"
            />
        </div>
    );
}

export default Feed;
