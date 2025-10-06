
import AWS from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


const downloadFile = (file, path) => {
    const retrievedFile = fs.createWriteStream(path)

    AWS.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const s3 = new AWS.S3();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file,
    };

    s3.getObject(params).createReadStream().pipe(retrievedFile);
}

export default downloadFile;