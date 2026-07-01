import * as userModel from "../models/userModels.js";
import { getRecipesByUserId } from "../models/recipeModels.js";
import { getPresignedGetUrl } from "../models/aws/get-presigned-url.js";

const withImageUrl = (recipe) => ({
    ...recipe,
    image_url: recipe.image_fname ? getPresignedGetUrl(recipe.image_fname) : null,
});

// The authenticated user's own profile + their recipes.
const getProfile = async (req, res) => {
    try {
        const auth0_id = req.auth.payload.sub;
        const user = await userModel.findOrCreateUser(auth0_id);
        const recipes = await getRecipesByUserId(user.id);
        res.json({ user, recipes: recipes.map(withImageUrl) });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

// Set/update the authenticated user's username and/or profile picture.
const updateProfile = async (req, res) => {
    try {
        const auth0_id = req.auth.payload.sub;
        const { username, pfp_url } = req.body;

        const cleanUsername = username && username.trim() ? username.trim() : null;
        const cleanPfp = pfp_url && pfp_url.trim() ? pfp_url.trim() : null;

        const user = await userModel.findOrCreateUser(auth0_id);
        const updated = await userModel.updateUser(user.id, {
            username: cleanUsername,
            pfp_url: cleanPfp,
        });
        res.json({ user: updated });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({ error: "username_taken", message: "That username is already taken." });
        }
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

// Any user's public profile + their recipes, looked up by username.
const getPublicProfile = async (req, res) => {
    try {
        const user = await userModel.getUserByUsername(req.params.username);
        if (!user) {
            return res.status(404).json({ error: "not_found", message: "User not found" });
        }
        const recipes = await getRecipesByUserId(user.id);
        res.json({ user, recipes: recipes.map(withImageUrl) });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

export { getProfile, updateProfile, getPublicProfile }
