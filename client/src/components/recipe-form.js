import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchCreateRecipe } from "../fetches/recipeFetch";
import { fetchPutIntoAWS } from "../fetches/awsFetch";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

const RecipeForm = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const toLines = (text) =>
    text.split("\n").map((line) => line.trim()).filter(Boolean);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setSelectedImage(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setStatus("Please choose an image file.");
      setSelectedImage(null);
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setStatus("Image must be under 5 MB.");
      setSelectedImage(null);
      return;
    }
    setStatus(null);
    setSelectedImage(file);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      setStatus("Please add a photo of your dish.");
      return;
    }
    setSubmitting(true);
    setStatus("Posting your recipe...");
    try {
      const accessToken = await getAccessTokenSilently();

      const recipe = {
        title,
        description,
        ingredients: toLines(ingredients),
        steps: toLines(steps),
        file: selectedImage.name
      };

      const { url } = await fetchCreateRecipe(recipe, accessToken);
      await fetchPutIntoAWS(url, selectedImage);

      setStatus("Recipe posted!");
      setTitle("");
      setDescription("");
      setIngredients("");
      setSteps("");
      setSelectedImage(null);
    } catch (err) {
      console.error(err.message);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h1 className="mt-5">Share a Recipe</h1>

      <label>Title</label>
      <input
        type="text"
        className="form-control"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label className="mt-3">Description</label>
      <textarea
        className="form-control"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tell people about this dish..."
      />

      <label className="mt-3">Ingredients (one per line)</label>
      <textarea
        className="form-control"
        rows={5}
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder={"2 eggs\n1 cup flour\n1 tsp salt"}
      />

      <label className="mt-3">Steps (one per line)</label>
      <textarea
        className="form-control"
        rows={5}
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        placeholder={"Preheat the oven to 350F\nMix the dry ingredients\n..."}
      />

      <label className="mt-3">Photo of the dish</label>
      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={onFileChange}
      />

      {selectedImage && (
        <div className="mt-3">
          <img
            alt="preview"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
        </div>
      )}

      <div className="mt-3">
        <button type="submit" className="btn btn-success" disabled={submitting}>
          {submitting ? "Posting..." : "Post Recipe"}
        </button>
      </div>

      {status && <p className="mt-3">{status}</p>}
    </form>
  );
};

export default RecipeForm;
