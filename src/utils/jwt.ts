import jwt from "jsonwebtoken";
import { UserPayload } from "../types";

const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";

export const generateAccessToken = (user: UserPayload) => {
  return jwt.sign(user, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (user: UserPayload) => {
  return jwt.sign(user, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET);