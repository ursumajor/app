import { findOrCreateUser } from "../models/userModels.js";
import { withImageUrl } from "../utils/recipeImageUrl.js";
import * as cookbookModel from "../models/cookbookModels.js";

// Resolves the authenticated user and a cookbook they own. Writes the error
// response and returns null when the cookbook is missing or not theirs.
const resolveOwnedCookbook = async (req, res) => {
    const auth0_id = req.auth.payload.sub;
    const user = await findOrCreateUser(auth0_id);
    const cookbook = await cookbookModel.getCookbookById(req.params.id);

    if (!cookbook) {
        res.status(404).json({ error: "not_found", message: "Cookbook not found" });
        return null;
    }
    if (cookbook.user_id !== user.id) {
        res.status(403).json({ error: "forbidden", message: "Not your cookbook" });
        return null;
    }
    return { user, cookbook };
}

const getMyCookbooks = async (req, res) => {
    try {
        const auth0_id = req.auth.payload.sub;
        const user = await findOrCreateUser(auth0_id);
        await cookbookModel.ensureDefaultCookbook(user.id);

        const recipeId = req.query.recipeId || null;
        const cookbooks = await cookbookModel.getCookbooksByUser(user.id, recipeId);
        res.json(cookbooks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const createCookbook = async (req, res) => {
    try {
        const auth0_id = req.auth.payload.sub;
        const name = req.body.name && req.body.name.trim();
        if (!name) {
            return res.status(400).json({ error: "bad_request", message: "Name is required" });
        }
        const user = await findOrCreateUser(auth0_id);
        const cookbook = await cookbookModel.createCookbook(user.id, name);
        res.json(cookbook);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const getCookbook = async (req, res) => {
    try {
        const owned = await resolveOwnedCookbook(req, res);
        if (!owned) return;

        const recipes = await cookbookModel.getCookbookRecipes(owned.cookbook.id);
        res.json({ ...owned.cookbook, recipes: recipes.map(withImageUrl) });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const deleteCookbook = async (req, res) => {
    try {
        const owned = await resolveOwnedCookbook(req, res);
        if (!owned) return;
        if (owned.cookbook.is_default) {
            return res.status(400).json({ error: "bad_request", message: "Cannot delete the default cookbook" });
        }
        await cookbookModel.deleteCookbook(owned.cookbook.id);
        res.json({ ok: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const addRecipe = async (req, res) => {
    try {
        const owned = await resolveOwnedCookbook(req, res);
        if (!owned) return;
        await cookbookModel.addRecipeToCookbook(owned.cookbook.id, req.body.recipe_id);
        res.json({ ok: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const removeRecipe = async (req, res) => {
    try {
        const owned = await resolveOwnedCookbook(req, res);
        if (!owned) return;
        await cookbookModel.removeRecipeFromCookbook(owned.cookbook.id, req.params.recipeId);
        res.json({ ok: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

export { getMyCookbooks, createCookbook, getCookbook, deleteCookbook, addRecipe, removeRecipe }
