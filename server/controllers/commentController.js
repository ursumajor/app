import { findOrCreateUser } from "../models/userModels.js";
import { getCommentsByRecipe, addComment } from "../models/commentModels.js";

const getComments = async (req, res) => {
    try {
        const comments = await getCommentsByRecipe(req.params.id);
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

const postComment = async (req, res) => {
    try {
        const body = req.body.body && req.body.body.trim();
        if (!body) {
            return res.status(400).json({ error: "bad_request", message: "Comment cannot be empty" });
        }
        const user = await findOrCreateUser(req.auth.payload.sub);
        const comment = await addComment(req.params.id, user.id, body);
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "server_error", message: err.message });
    }
}

export { getComments, postComment }
