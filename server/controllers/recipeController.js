import { randomUUID } from "crypto";
import { getPresignedPutUrl } from "../models/aws/get-presigned-url.js";
import { inputRecipe, getAllRecipes, getRecipe, getRecipesFromFollowedUsers } from "../models/recipeModels.js";
import { findOrCreateUser } from "../models/userModels.js";
import { ensureDefaultCookbook, addRecipeToCookbook, removeRecipeFromCookbook, isRecipeInCookbook } from "../models/cookbookModels.js";
import { withImageUrl } from "../utils/recipeImageUrl.js";

const getRecipes = async (req, res) => {
    try {
        const recipes = await getAllRecipes();
        res.json(recipes.map(withImageUrl));
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

// Feed of recipes from users the authenticated user follows.
const getFollowingFeed = async (req, res) => {
    try {
        const user = await findOrCreateUser(req.auth.payload.sub);
        const recipes = await getRecipesFromFollowedUsers(user.id);
        res.json(recipes.map(withImageUrl));
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

// "Liking" a recipe = saving it to the user's default "Liked Recipes" cookbook.
const getLikeStatus = async (req, res) => {
    try {
        const user = await findOrCreateUser(req.auth.payload.sub);
        const cookbook = await ensureDefaultCookbook(user.id);
        const liked = await isRecipeInCookbook(cookbook.id, req.params.id);
        res.json({ liked });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const likeRecipe = async (req, res) => {
    try {
        const user = await findOrCreateUser(req.auth.payload.sub);
        const cookbook = await ensureDefaultCookbook(user.id);
        await addRecipeToCookbook(cookbook.id, req.params.id);
        res.json({ liked: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const unlikeRecipe = async (req, res) => {
    try {
        const user = await findOrCreateUser(req.auth.payload.sub);
        const cookbook = await ensureDefaultCookbook(user.id);
        await removeRecipeFromCookbook(cookbook.id, req.params.id);
        res.json({ liked: false });
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

export { getRecipes, getFollowingFeed, getRecipeById, createRecipe, getLikeStatus, likeRecipe, unlikeRecipe }
