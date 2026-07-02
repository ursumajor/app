import * as userModel from "../models/userModels.js";
import { getRecipesByUserId } from "../models/recipeModels.js";
import { withImageUrl } from "../utils/recipeImageUrl.js";

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

// Any user's public profile + their recipes + follower/following counts.
const getPublicProfile = async (req, res) => {
    try {
        const user = await userModel.getUserByUsername(req.params.username);
        if (!user) {
            return res.status(404).json({ error: "not_found", message: "User not found" });
        }
        const recipes = await getRecipesByUserId(user.id);
        const counts = await userModel.getFollowCounts(user.id);
        res.json({ user, recipes: recipes.map(withImageUrl), counts });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

// Resolves the authenticated follower and the target user (by username).
// Writes the error response and returns null on self-follow or missing target.
const resolveFollowTarget = async (req, res) => {
    const follower = await userModel.findOrCreateUser(req.auth.payload.sub);
    const target = await userModel.getUserByUsername(req.params.username);
    if (!target) {
        res.status(404).json({ error: "not_found", message: "User not found" });
        return null;
    }
    if (target.id === follower.id) {
        res.status(400).json({ error: "bad_request", message: "You cannot follow yourself" });
        return null;
    }
    return { follower, target };
}

const getFollowStatus = async (req, res) => {
    try {
        const follower = await userModel.findOrCreateUser(req.auth.payload.sub);
        const target = await userModel.getUserByUsername(req.params.username);
        if (!target) {
            return res.status(404).json({ error: "not_found", message: "User not found" });
        }
        if (target.id === follower.id) {
            return res.status(400).json({ error: "self", message: "This is you" });
        }
        const following = await userModel.isFollowing(follower.id, target.id);
        res.json({ following });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const followUser = async (req, res) => {
    try {
        const resolved = await resolveFollowTarget(req, res);
        if (!resolved) return;
        await userModel.followUser(resolved.follower.id, resolved.target.id);
        res.json({ following: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const unfollowUser = async (req, res) => {
    try {
        const resolved = await resolveFollowTarget(req, res);
        if (!resolved) return;
        await userModel.unfollowUser(resolved.follower.id, resolved.target.id);
        res.json({ following: false });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

export { getProfile, updateProfile, getPublicProfile, getFollowStatus, followUser, unfollowUser }
