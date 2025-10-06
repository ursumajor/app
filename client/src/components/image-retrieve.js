import React, {Fragment, useEffect, useState} from "react";
import { fetchGetPresignedUrl, fetchGetIntoAWS } from "../fetches/awsFetch";

const DownloadAndDisplayImage = (props) => {
  const [image, setImage] = useState(null);

  const effect = async () => {
    const url = await fetchGetPresignedUrl(props.bucket_image_name);
    const file = await fetchGetIntoAWS(url);
    const blob = await file.blob();
    setImage(blob);
  }
  useEffect(() => {
    effect();
  },[]);


  return (
    <div>
        {image && <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(image)}
        />}
    </div>
  );
};

export default DownloadAndDisplayImage;