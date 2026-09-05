import jwt from "jsonwebtoken";

const JWT_SECRET = "nexus_super_secret_key_123";

export function verifyToken(token: string) {
  try {
    // This checks if the token is valid and hasn't expired
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    return decoded;
  } catch (error) {
    return null; // Token is invalid or expired
  }
}