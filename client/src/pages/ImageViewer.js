import React, {Fragment} from 'react';
import { useParams } from "react-router"
import DownloadAndDisplayImage from '../components/image-retrieve';

const ImageViewer = () => {
    return <DownloadAndDisplayImage bucket_image_name="test3.jpg"/>
}

export default ImageViewer;