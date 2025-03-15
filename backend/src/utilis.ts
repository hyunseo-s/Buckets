import jwt from "jsonwebtoken";

const SECRET = "TOPSECRET";

export function decodeJWT(token: string): string {
  try {
    // Verify and decode the JWT
    const decoded = JSON.parse(jwt.verify(token, SECRET) as string);
    console.log("Decoded JWT:", decoded.user);

    return decoded.user
  } catch (error) {
    console.error("Invalid JWT:", error.message);
  }
}