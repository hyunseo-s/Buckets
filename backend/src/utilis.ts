import jwt from "jsonwebtoken";

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