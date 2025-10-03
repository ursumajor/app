import * as dataController from "../controllers/dataController.js"

import express from 'express';
const app = express.Router();

app.post(``, dataController.requestInsert)

app.get("", dataController.requestAllData);

app.get("/:id",dataController.requestData);

app.put("/:id", dataController.requestEdit);

app.delete("/:id", dataController.requestDelete);


export default app;