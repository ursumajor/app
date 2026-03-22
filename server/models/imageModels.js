import pool from '../db.js';

const getAllImages = async () => {
    const all_data = await pool.query("SELECT * FROM images");
    return all_data.rows;
}

const getImage = async (id) => {
    const data = await pool.query("SELECT * FROM images WHERE id = $1", [id]);
    return data.rows[0]
}

const inputImage = async (id, fname, uploade_date, user_id) => {
    const inserted_data = await pool.query("INSERT INTO images (key, description) VALUES($1, $2) RETURNING *", [key, description]);
    return inserted_data.rows[0]
}

const editImage = async (id, newDescription) => {
    const updated_data = await pool.query(
      "UPDATE images SET description = $1 WHERE id = $2",
      [newDescription, id]
    );
}

const deleteImage = async (id) => {
    await pool.query("DELETE FROM images WHERE id = $1", [id]);
}

export {getAllImages, getImage, inputImage, editImage, deleteImage}