import { randomUUID } from "crypto";
import { getPresignedGetUrl, getPresignedPutUrl } from "../models/aws/get-presigned-url.js";
import { inputRecipe, getAllRecipes, getRecipe } from "../models/recipeModels.js";
import { findOrCreateUser } from "../models/userModels.js";

const withImageUrl = (recipe) => ({
    ...recipe,
    image_url: recipe.image_fname ? getPresignedGetUrl(recipe.image_fname) : null,
});

const getRecipes = async (req, res) => {
    try {
        const recipes = await getAllRecipes();
        res.json(recipes.map(withImageUrl));
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const getRecipeById = async (req, res) => {
    try {
        const recipe = await getRecipe(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: "not_found", message: "Recipe not found" });
        }
        res.json(withImageUrl(recipe));
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const createRecipe = async (req, res) => {
    try {
        const auth0_id = req.auth.payload.sub;
        const { title, description, ingredients, steps, file } = req.body;

        const user = await findOrCreateUser(auth0_id);

        const ext = file && file.includes(".") ? file.split(".").pop() : "";
        const image_fname = ext ? `${randomUUID()}.${ext}` : randomUUID();

        const recipe = await inputRecipe({
            user_id: user.id,
            title,
            description,
            ingredients,
            steps,
            image_fname,
        });

        const url = getPresignedPutUrl(image_fname);
        res.json({ url, fname: image_fname, id: recipe.id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

export { getRecipes, getRecipeById, createRecipe }
