import uploadFile from "../models/aws/upload-file.js";
import downloadFile from "../models/aws/download-file.js";
import { getPresignedGetUrl, getPresignedPutUrl } from "../models/aws/get-presigned-url.js";
import {getAllImageData, getImageDatum, inputImageDatum, editImageDatum, deleteImageDatum} from "../models/imageModels.js"



const requestImageUpload = async (req, res) => {
    try {
        const url = getPresignedGetUrl(req.body.file);
        res.json(url);
    } catch(err) {
        console.error(err.message);
    }
}


const requestPresignedPutURL = async (req, res) => {
    try {
        const url = getPresignedPutUrl(req.body.file);
        res.json(url);
    } catch(err) {
        console.error(err.message);
    }
}


export {requestUpload, requestDownload, requestPresignedGetURL, requestPresignedPutURL}