const API = "http://localhost:5000";

const fetchComments = async (recipeId) => {
    const request = await fetch(`${API}/recipes/${recipeId}/comments`, { method: "GET" });
    return await request.json();
};

const addComment = async (recipeId, body, accessToken) => {
    const request = await fetch(`${API}/recipes/${recipeId}/comments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
    });
    return await request.json();
};

export { fetchComments, addComment };
