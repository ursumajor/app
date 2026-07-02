import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchLikeStatus, likeRecipe, unlikeRecipe } from "../fetches/recipeFetch";

const LikeButton = ({ recipeId }) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) return;
        const load = async () => {
            try {
                const token = await getAccessTokenSilently();
                const data = await fetchLikeStatus(recipeId, token);
                setLiked(data.liked);
            } catch (err) {
                console.error(err.message);
            }
        };
        load();
    }, [recipeId, isAuthenticated]);

    const toggle = async () => {
        try {
            const token = await getAccessTokenSilently();
            if (liked) {
                await unlikeRecipe(recipeId, token);
                setLiked(false);
            } else {
                await likeRecipe(recipeId, token);
                setLiked(true);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <button
            className="btn btn-link p-0"
            onClick={toggle}
            aria-label={liked ? "Unlike" : "Like"}
            style={{ fontSize: "1.75rem", textDecoration: "none", color: liked ? "crimson" : "gray" }}
        >
            {liked ? "♥" : "♡"}
        </button>
    );
};

export default LikeButton;
