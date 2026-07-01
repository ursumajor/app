import pool from '../db.js';

const getAllUsers = async () => {
    const all_users = await pool.query("SELECT * FROM users");
    return all_users.rows;
}

const getUserById = async (id) => {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return user.rows[0]
}

const getUserByAuth0Id = async (auth0_id) => {
    const user = await pool.query("SELECT * FROM users WHERE auth0_id = $1", [auth0_id]);
    return user.rows[0]
}

const insertUser = async (auth0_id) => {
    const result = await pool.query(
        `INSERT INTO users (auth0_id) VALUES ($1) RETURNING *`,
        [auth0_id]
    );
    return result.rows[0];
};

const findOrCreateUser = async (auth0_id) => {
    const existing = await getUserByAuth0Id(auth0_id);
    if (existing) return existing;
    return await insertUser(auth0_id);
};

const getUserByUsername = async (username) => {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return user.rows[0];
};

const updateUser = async (id, { username, pfp_url }) => {
    const result = await pool.query(
        `UPDATE users
         SET username = COALESCE($1, username),
             pfp_url  = COALESCE($2, pfp_url)
         WHERE id = $3
         RETURNING *`,
        [username ?? null, pfp_url ?? null, id]
    );
    return result.rows[0];
};

export {getAllUsers, getUserById, getUserByAuth0Id, insertUser, findOrCreateUser, getUserByUsername, updateUser}