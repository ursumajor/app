import checkJwt from "../middleware/requireAuth.js";
import { getRecipes, getRecipeById, createRecipe } from "../controllers/recipeController.js";
import { handler } from "./errorhandling.js";

import express from 'express';
const app = express.Router();

app.get("", getRecipes);
app.get("/:id", getRecipeById);
app.post("", checkJwt, createRecipe);
app.use(handler);

export default app;
