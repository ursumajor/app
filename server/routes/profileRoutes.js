import checkJwt from "../middleware/requireAuth.js";
import {
    getProfile,
    updateProfile,
    getPublicProfile,
    getFollowStatus,
    followUser,
    unfollowUser,
} from "../controllers/profileController.js";
import { handler } from "./errorhandling.js";

import express from 'express';
const app = express.Router();

app.get("", checkJwt, getProfile);
app.put("", checkJwt, updateProfile);

app.get("/:username/follow", checkJwt, getFollowStatus);
app.post("/:username/follow", checkJwt, followUser);
app.delete("/:username/follow", checkJwt, unfollowUser);

app.get("/:username", getPublicProfile);
app.use(handler);

export default app;
