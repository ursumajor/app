import checkJwt from "../middleware/requireAuth.js";
import {
    getMyCookbooks,
    createCookbook,
    getCookbook,
    deleteCookbook,
    addRecipe,
    removeRecipe,
} from "../controllers/cookbookController.js";
import { handler } from "./errorhandling.js";

import express from 'express';
const app = express.Router();

app.get("", checkJwt, getMyCookbooks);
app.post("", checkJwt, createCookbook);
app.get("/:id", checkJwt, getCookbook);
app.delete("/:id", checkJwt, deleteCookbook);
app.post("/:id/recipes", checkJwt, addRecipe);
app.delete("/:id/recipes/:recipeId", checkJwt, removeRecipe);
app.use(handler);

export default app;
