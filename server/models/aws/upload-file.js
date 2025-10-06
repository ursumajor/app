import AWS from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


const uploadFile = (file, path) => {
    AWS.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const s3 = new AWS.S3();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file,
        Body: fs.createReadStream(path)
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Error uploading file:', err);
        } else {
            console.log('File uploaded successfully. File location:', data.Location);
        }
    });
}

export default uploadFile;