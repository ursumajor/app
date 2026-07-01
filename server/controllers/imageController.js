import { randomUUID } from "crypto";
import uploadFile from "../models/aws/upload-file.js";
import downloadFile from "../models/aws/download-file.js";
import { getPresignedGetUrl, getPresignedPutUrl } from "../models/aws/get-presigned-url.js";
import {inputImage, getAllImages} from "../models/imageModels.js"
import { findOrCreateUser } from "../models/userModels.js"

const getImages = async (req, res) => {
    try {
        const images = await getAllImages();
        res.json(images);
    } catch(err) {
        console.error(err.message);
    }
}

const requestImageUpload = async (req, res) => {

    try {
        const auth0_id = req.auth.payload.sub;
        const originalName = req.body.file
        const ext = originalName.includes(".") ? originalName.split(".").pop() : "";
        const fname = ext ? `${randomUUID()}.${ext}` : randomUUID();
        const user = await findOrCreateUser(auth0_id);
        const image = await inputImage(fname, user.id);
        const url = getPresignedPutUrl(fname);
        res.json({ url, fname });
    } catch(err) {
        console.error(err.message);
    }
}


export {requestImageUpload, getImages }