import * as dataModel from "../models/dataModels.js"


const requestInsert = async (req, res) => {
     try {
        const {description} = req.body;
        const inserted_data = await dataModel.inputDatum(description);
        res.json(inserted_data);
    } catch(err) {
        console.error(err.message);
    }
}

const requestAllData = async (req, res) => {
    try {
        const all_data = await dataModel.getAllData();
        res.json(all_data);
    } catch (err) {
        console.error(err.message);
    }
}

const requestData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await dataModel.getDatum(id);
        res.json(data);
    } catch (err) {
        console.error(err.message);
    }
}

const requestEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updated_data = await dataModel.editDatum(id, description)
        res.json("Data was updated!");
    } catch (err) {
        console.error(err.message);
    }
}

const requestDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await dataModel.deleteDatum(id);
        res.json("Data was Deleted!");
    } catch (err) {
        console.error(err.message);
    }
}

export {requestInsert, requestAllData, requestData, requestEdit, requestDelete}