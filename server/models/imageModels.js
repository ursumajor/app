import pool from '../db.js';

const getAllImageData = async () => {
    const all_data = await pool.query("SELECT * FROM image_data");
    return all_data.rows;
}

const getImageDatum = async (id) => {
    const data = await pool.query("SELECT * FROM image_data WHERE id = $1", [id]);
    return data.rows[0]
}

const inputImageDatum = async (key, description) => {
    const inserted_data = await pool.query("INSERT INTO image_data (key, description) VALUES($1, $2) RETURNING *", [key, description]);
    return inserted_data.rows[0]
}

const editImageDatum = async (id, newDescription) => {
    const updated_data = await pool.query(
      "UPDATE image_data SET description = $1 WHERE id = $2",
      [newDescription, id]
    );
}

const deleteImageDatum = async (id) => {
    await pool.query("DELETE FROM image_data WHERE id = $1", [id]);
}

export {getAllImageData, getImageDatum, inputImageDatum, editImageDatum, deleteImageDatum}