import pool from '../db.js';

// Ensures the user has their default "Liked Recipes" cookbook, creating it
// lazily if missing (also covers users created before cookbooks existed).
const ensureDefaultCookbook = async (user_id) => {
    const existing = await pool.query(
        "SELECT * FROM cookbooks WHERE user_id = $1 AND is_default = TRUE",
        [user_id]
    );
    if (existing.rows[0]) return existing.rows[0];

    const created = await pool.query(
        `INSERT INTO cookbooks (user_id, name, is_default)
         VALUES ($1, 'Liked Recipes', TRUE) RETURNING *`,
        [user_id]
    );
    return created.rows[0];
}

// All of a user's cookbooks with recipe counts. When recipeId is given, each
// cookbook also gets a `contains` flag for that recipe (for the save picker).
const getCookbooksByUser = async (user_id, recipeId = null) => {
    const result = await pool.query(
        `SELECT c.*,
            (SELECT COUNT(*) FROM cookbook_recipes cr WHERE cr.cookbook_id = c.id)::int AS recipe_count,
            EXISTS(
                SELECT 1 FROM cookbook_recipes cr2
                WHERE cr2.cookbook_id = c.id AND cr2.recipe_id = $2
            ) AS contains
         FROM cookbooks c
         WHERE c.user_id = $1
         ORDER BY c.is_default DESC, c.created_at ASC`,
        [user_id, recipeId]
    );
    return result.rows;
}

const getCookbookById = async (id) => {
    const result = await pool.query("SELECT * FROM cookbooks WHERE id = $1", [id]);
    return result.rows[0];
}

const createCookbook = async (user_id, name) => {
    const result = await pool.query(
        `INSERT INTO cookbooks (user_id, name) VALUES ($1, $2) RETURNING *`,
        [user_id, name]
    );
    return result.rows[0];
}

const deleteCookbook = async (id) => {
    await pool.query("DELETE FROM cookbooks WHERE id = $1", [id]);
}

const getCookbookRecipes = async (cookbook_id) => {
    const result = await pool.query(
        `SELECT r.*, u.username, u.pfp_url, cr.added_at
         FROM cookbook_recipes cr
         JOIN recipes r ON r.id = cr.recipe_id
         JOIN users u ON u.id = r.user_id
         WHERE cr.cookbook_id = $1
         ORDER BY cr.added_at DESC`,
        [cookbook_id]
    );
    return result.rows;
}

const addRecipeToCookbook = async (cookbook_id, recipe_id) => {
    await pool.query(
        `INSERT INTO cookbook_recipes (cookbook_id, recipe_id)
         VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [cookbook_id, recipe_id]
    );
}

const removeRecipeFromCookbook = async (cookbook_id, recipe_id) => {
    await pool.query(
        "DELETE FROM cookbook_recipes WHERE cookbook_id = $1 AND recipe_id = $2",
        [cookbook_id, recipe_id]
    );
}

const isRecipeInCookbook = async (cookbook_id, recipe_id) => {
    const result = await pool.query(
        "SELECT 1 FROM cookbook_recipes WHERE cookbook_id = $1 AND recipe_id = $2",
        [cookbook_id, recipe_id]
    );
    return result.rows.length > 0;
}

export {
    ensureDefaultCookbook,
    getCookbooksByUser,
    getCookbookById,
    createCookbook,
    deleteCookbook,
    getCookbookRecipes,
    addRecipeToCookbook,
    removeRecipeFromCookbook,
    isRecipeInCookbook,
}
