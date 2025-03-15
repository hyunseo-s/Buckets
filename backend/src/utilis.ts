import jwt from "jsonwebtoken";

const SECRET = "TOPSECRET";

export function decodeJWT(token: string): void {
  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, SECRET);
    console.log("Decoded JWT:", decoded.user);

    return decoded.user
  } catch (error) {
    console.error("Invalid JWT:", error.message);
  }
}