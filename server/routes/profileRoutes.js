import checkJwt from "../middleware/requireAuth.js";
import { getProfile } from "../controllers/profileController.js";
import { handler } from "./errorhandling.js";

import express from 'express';
const app = express.Router();

app.get("", checkJwt, getProfile);
// app.post("", checkJwt, getProfile)
app.use(handler);

export default app;