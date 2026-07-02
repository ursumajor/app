const fetchCreateRecipe = async (recipe, accessToken) => {
    const request = await fetch("http://localhost:5000/recipes",
        {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify(recipe)
        });
    return await request.json();
};

const fetchAllRecipes = async () => {
    const request = await fetch("http://localhost:5000/recipes", { method: "GET" });
    return await request.json();
};

const fetchRecipe = async (id) => {
    const request = await fetch(`http://localhost:5000/recipes/${id}`, { method: "GET" });
    return await request.json();
};

const fetchFollowingRecipes = async (accessToken) => {
    const request = await fetch("http://localhost:5000/recipes/following", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await request.json();
};

const fetchLikeStatus = async (id, accessToken) => {
    const request = await fetch(`http://localhost:5000/recipes/${id}/like`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await request.json();
};

const likeRecipe = async (id, accessToken) => {
    const request = await fetch(`http://localhost:5000/recipes/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await request.json();
};

const unlikeRecipe = async (id, accessToken) => {
    const request = await fetch(`http://localhost:5000/recipes/${id}/like`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await request.json();
};

export {
    fetchCreateRecipe,
    fetchAllRecipes,
    fetchRecipe,
    fetchFollowingRecipes,
    fetchLikeStatus,
    likeRecipe,
    unlikeRecipe,
};
