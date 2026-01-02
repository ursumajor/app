import checkJwt from "../middleware/requireAuth.js";

import express from 'express';
const app = express.Router();

app.get("", checkJwt);


export default app;