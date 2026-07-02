import pool from '../db.js';

const getCommentsByRecipe = async (recipe_id) => {
    const result = await pool.query(
        `SELECT c.*, u.username, u.pfp_url
         FROM comments c
         JOIN users u ON u.id = c.user_id
         WHERE c.recipe_id = $1
         ORDER BY c.created_at ASC`,
        [recipe_id]
    );
    return result.rows;
}

const addComment = async (recipe_id, user_id, body) => {
    const result = await pool.query(
        `INSERT INTO comments (recipe_id, user_id, body)
         VALUES ($1, $2, $3) RETURNING *`,
        [recipe_id, user_id, body]
    );
    return result.rows[0];
}

export { getCommentsByRecipe, addComment }
