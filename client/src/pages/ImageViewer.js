import React, {useEffect, useState} from 'react';
import DownloadAndDisplayImage from '../components/image-retrieve';
import { fetchAllImages } from '../fetches/awsFetch';

const ImageViewer = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await fetchAllImages();
            setImages(data);
        }
        load();
    }, []);

    return (
        <div>
            {images.map((image) => (
                <DownloadAndDisplayImage key={image.id} bucket_image_name={image.fname} />
            ))}
        </div>
    );
}

export default ImageViewer;
