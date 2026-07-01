import checkJwt from "../middleware/requireAuth.js";
import { getProfile, updateProfile, getPublicProfile } from "../controllers/profileController.js";
import { handler } from "./errorhandling.js";

import express from 'express';
const app = express.Router();

app.get("", checkJwt, getProfile);
app.put("", checkJwt, updateProfile);
app.get("/:username", getPublicProfile);
app.use(handler);

export default app;
