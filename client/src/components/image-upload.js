import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchPutIntoAWS, fetchPutImage } from "../fetches/awsFetch";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { getAccessTokenWithPopup } = useAuth0();

  const buttonHandler = async (event) => {
    const accessToken = await getAccessTokenWithPopup({
      authorizationParams: {
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: "read:profile write:profile"
      }
    });
    const { url } = await fetchPutImage(selectedImage.name, accessToken);
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