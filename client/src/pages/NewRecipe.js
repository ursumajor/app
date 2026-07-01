import React from 'react';
import RequireAuth from '../components/RequireAuth';
import RecipeForm from '../components/recipe-form';

const NewRecipe = () => {
    return (
        <RequireAuth>
            <div className="container">
                <RecipeForm />
            </div>
        </RequireAuth>
    );
}

export default NewRecipe;
