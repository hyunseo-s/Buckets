import jwt from "jsonwebtoken";
import config from  "./config.json";

const SECRET = "TOPSECRET";

export function decodeJWT(token: string): string {
  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, SECRET);

    return decoded.user
  } catch (error) {
    console.error("Invalid JWT:", error.message);
  }
}

// Function to search for images on Unsplash
export async function fetchUnsplashImages(query: string) {
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${config.unsplash_api_key}`);
  const data = await response.json();

  // Extract image URL
  if (data && data.urls.full) {
    const imageUrl = data.urls.full;
		return imageUrl;
  } else {
    return null
  }
}
