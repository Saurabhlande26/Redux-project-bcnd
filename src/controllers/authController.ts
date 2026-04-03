import { Request, Response } from "express";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/jwt";

let refreshTokens: string[] = []; // store in DB in real apps

const dummyUser = {
    id: 1,
    email: "admin@gmail.com",
    password: "123456",
    role: "admin"
};

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email !== dummyUser.email || password !== dummyUser.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload: any = {
        id: dummyUser.id,
        email: dummyUser.email,
        role: dummyUser.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
};

export const refresh = (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    try {
        const user = verifyRefreshToken(refreshToken);

        const newAccessToken = generateAccessToken(user as any);

        res.json({ accessToken: newAccessToken });
    } catch {
        res.status(401).json({ message: "Token expired" });
    }
};