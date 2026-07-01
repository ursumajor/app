import checkJwt from "../middleware/requireAuth.js";
import { requestImageUpload, getImages } from "../controllers/imageController.js";
import { handler } from "./errorhandling.js";

import express from 'express';
const app = express.Router();

app.get("", getImages);
app.post("", checkJwt, requestImageUpload);
app.use(handler);

export default app;