import uploadFile from "../models/aws/upload-file.js";
import downloadFile from "../models/aws/download-file.js";
import { getPresignedGetUrl, getPresignedPutUrl } from "../models/aws/get-presigned-url.js";


const requestUpload = async (req, res) => {
     try {
        console.log(req.body.file, req.body.path)
        uploadFile(req.body.file, req.body.path)
        res.json("Image uploaded!");
    } catch(err) {
        console.error(err.message);
    }
}


const requestDownload = async (req, res) => {
    //  try {
    //     uploadFile(req.file, req.path)
    // } catch(err) {
    //     console.error(err.message);
    // }
}

const requestPresignedGetURL = async (req, res) => {
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