import checkJwt from "../middleware/requireAuth.js";
import {
    getRecipes,
    getFollowingFeed,
    getRecipeById,
    createRecipe,
    getLikeStatus,
    likeRecipe,
    unlikeRecipe,
} from "../controllers/recipeController.js";
import { getComments, postComment } from "../controllers/commentController.js";
import { handler } from "./errorhandling.js";

import express from 'express';
const app = express.Router();

app.get("", getRecipes);
app.get("/following", checkJwt, getFollowingFeed);
app.post("", checkJwt, createRecipe);

app.get("/:id/like", checkJwt, getLikeStatus);
app.post("/:id/like", checkJwt, likeRecipe);
app.delete("/:id/like", checkJwt, unlikeRecipe);

app.get("/:id/comments", getComments);
app.post("/:id/comments", checkJwt, postComment);

app.get("/:id", getRecipeById);
app.use(handler);

export default app;
