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

// const inputUser = async (description) => {
//     const inserted_data = await pool.query("INSERT INTO data (description) VALUES($1) RETURNING *", [description]);
//     return inserted_data.rows[0]
// }

// const editDatum = async (id, newDescription) => {
//     const updated_data = await pool.query(
//       "UPDATE data SET description = $1 WHERE id = $2",
//       [newDescription, id]
//     );
// }

// const deleteDatum = async (id) => {
//     await pool.query("DELETE FROM data WHERE id = $1", [id]);
// }

export {getAllUsers, getUserById, getUserByAuth0Id, insertUser, findOrCreateUser}