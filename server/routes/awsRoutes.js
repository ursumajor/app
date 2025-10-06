import * as awsController from "../controllers/awsController.js"

import express from 'express';
const app = express.Router();

app.post("/",awsController.requestUpload);
app.post("/requestgetURL", awsController.requestPresignedGetURL);
app.post("/requestputURL", awsController.requestPresignedPutURL);

export default app;