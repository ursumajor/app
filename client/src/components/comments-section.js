import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchComments, addComment } from "../fetches/commentFetch";

const CommentsSection = ({ recipeId }) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [comments, setComments] = useState([]);
    const [body, setBody] = useState("");

    const load = async () => {
        try {
            setComments(await fetchComments(recipeId));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => { load(); }, [recipeId]);

    const submit = async (event) => {
        event.preventDefault();
        if (!body.trim()) return;
        try {
            const token = await getAccessTokenSilently();
            await addComment(recipeId, body.trim(), token);
            setBody("");
            await load();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="mt-5">
            <h3>Comments</h3>

            {isAuthenticated && (
                <form onSubmit={submit} className="mb-3">
                    <textarea
                        className="form-control"
                        rows={2}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button className="btn btn-success mt-2" type="submit">Post</button>
                </form>
            )}

            {comments.length === 0 && <p>No comments yet.</p>}
            {comments.map((comment) => (
                <div key={comment.id} className="mb-2">
                    <strong>
                        {comment.username
                            ? <Link to={`/profile/${comment.username}`}>{comment.username}</Link>
                            : "anonymous"}
                    </strong>
                    {": "}
                    {comment.body}
                </div>
            ))}
        </div>
    );
};

export default CommentsSection;
