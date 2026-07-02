const API = "http://localhost:5000";

const authHeaders = (accessToken) => ({ Authorization: `Bearer ${accessToken}` });

const fetchMyCookbooks = async (accessToken, recipeId = null) => {
    const query = recipeId ? `?recipeId=${recipeId}` : "";
    const request = await fetch(`${API}/cookbooks${query}`, {
        method: "GET",
        headers: authHeaders(accessToken),
    });
    return await request.json();
};

const createCookbook = async (name, accessToken) => {
    const request = await fetch(`${API}/cookbooks`, {
        method: "POST",
        headers: { ...authHeaders(accessToken), "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    return await request.json();
};

const fetchCookbook = async (id, accessToken) => {
    const request = await fetch(`${API}/cookbooks/${id}`, {
        method: "GET",
        headers: authHeaders(accessToken),
    });
    return await request.json();
};

const addRecipeToCookbook = async (cookbookId, recipeId, accessToken) => {
    await fetch(`${API}/cookbooks/${cookbookId}/recipes`, {
        method: "POST",
        headers: { ...authHeaders(accessToken), "Content-Type": "application/json" },
        body: JSON.stringify({ recipe_id: recipeId }),
    });
};

const removeRecipeFromCookbook = async (cookbookId, recipeId, accessToken) => {
    await fetch(`${API}/cookbooks/${cookbookId}/recipes/${recipeId}`, {
        method: "DELETE",
        headers: authHeaders(accessToken),
    });
};

export {
    fetchMyCookbooks,
    createCookbook,
    fetchCookbook,
    addRecipeToCookbook,
    removeRecipeFromCookbook,
};
