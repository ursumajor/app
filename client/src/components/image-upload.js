import React, { useState } from "react";
import { fetchPutIntoAWS, fetchPutPresignedUrl } from "../fetches/awsFetch";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const buttonHandler = async (event) => {
    const url = await fetchPutPresignedUrl("test4.jpg");
    console.log(url);
    await fetchPutIntoAWS(url, selectedImage);
  }

  return (
    <div>
      <h1>Upload and Display Image</h1>

      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br /> <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
      <input
        type="file"
        name="myImage"
        onChange={async (event) => { 
          setSelectedImage(event.target.files[0]); // Update the state with the selected file
        }}
      />
      <button type="button" className="btn btn-success" onClick={buttonHandler}>Upload to DB</button>
    </div>
  );
};

export default UploadAndDisplayImage;