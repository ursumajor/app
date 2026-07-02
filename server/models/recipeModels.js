import pool from '../db.js';

const getAllRecipes = async () => {
    const result = await pool.query(
        `SELECT r.*, u.username, u.pfp_url
         FROM recipes r
         JOIN users u ON u.id = r.user_id
         ORDER BY r.created_at DESC, r.id DESC`
    );
    return result.rows;
}

const getRecipe = async (id) => {
    const result = await pool.query(
        `SELECT r.*, u.username, u.pfp_url
         FROM recipes r
         JOIN users u ON u.id = r.user_id
         WHERE r.id = $1`,
        [id]
    );
    return result.rows[0];
}

const getRecipesByUserId = async (user_id) => {
    const result = await pool.query(
        `SELECT r.*, u.username, u.pfp_url
         FROM recipes r
         JOIN users u ON u.id = r.user_id
         WHERE r.user_id = $1
         ORDER BY r.created_at DESC, r.id DESC`,
        [user_id]
    );
    return result.rows;
}

const getRecipesFromFollowedUsers = async (user_id) => {
    const result = await pool.query(
        `SELECT r.*, u.username, u.pfp_url
         FROM recipes r
         JOIN users u ON u.id = r.user_id
         WHERE r.user_id IN (SELECT followed_id FROM follows WHERE follower_id = $1)
         ORDER BY r.created_at DESC, r.id DESC`,
        [user_id]
    );
    return result.rows;
}

const inputRecipe = async ({ user_id, title, description, ingredients, steps, image_fname }) => {
    const result = await pool.query(
        `INSERT INTO recipes (user_id, title, description, ingredients, steps, image_fname)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [user_id, title, description, JSON.stringify(ingredients), JSON.stringify(steps), image_fname]
    );
    return result.rows[0];
}

export { getAllRecipes, getRecipe, getRecipesByUserId, getRecipesFromFollowedUsers, inputRecipe }
