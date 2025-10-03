import pool from '../db.js';

const getAllData = async () => {
    const all_data = await pool.query("SELECT * FROM data");
    return all_data.rows;
}

const getDatum = async (id) => {
    const data = await pool.query("SELECT * FROM data WHERE id = $1", [id]);
    return data.rows[0]
}

const inputDatum = async (description) => {
    const inserted_data = await pool.query("INSERT INTO data (description) VALUES($1) RETURNING *", [description]);
    return inserted_data.rows[0]
}

const editDatum = async (id, newDescription) => {
    const updated_data = await pool.query(
      "UPDATE data SET description = $1 WHERE id = $2",
      [newDescription, id]
    );
}

const deleteDatum = async (id) => {
    await pool.query("DELETE FROM data WHERE id = $1", [id]);
}

export {getAllData, getDatum, inputDatum, editDatum, deleteDatum}