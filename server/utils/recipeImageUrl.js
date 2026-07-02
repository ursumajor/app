import { getPresignedGetUrl } from "../models/aws/get-presigned-url.js";

// Attaches a presigned GET URL (image_url) to a recipe row so the client
// can render <img src> directly without a per-image round-trip.
const withImageUrl = (recipe) => ({
    ...recipe,
    image_url: recipe.image_fname ? getPresignedGetUrl(recipe.image_fname) : null,
});

export { withImageUrl };
