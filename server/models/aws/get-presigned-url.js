import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();


const getPresignedGetUrl = (file) => {
    AWS.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const s3 = new AWS.S3();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file,
        Expires: 3600
    };

    return s3.getSignedUrl('getObject', params)
};

const getPresignedPutUrl = (file) => {
    AWS.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const s3 = new AWS.S3();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file,
        Expires: 3600
    };

    return s3.getSignedUrl('putObject', params)
};

export {getPresignedGetUrl, getPresignedPutUrl};