import { Request, Response } from "express";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/jwt";
import { User } from "../entity/User";
import { AppDataSource } from "../config/data-source";
import bcrypt from 'bcrypt';

let refreshTokens: string[] = []; // keep for now
const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
    console.log("first")
    try {
        const { email, password } = req.body;

        const existing = await userRepo.findOneBy({ email });

        if (existing) return res.status(400).json({ message: "User already exists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = userRepo.create({ email, password: hashed });

        await userRepo.save(user);

        res.json({ message: "User created" });

    } catch (err) {
        console.log({ err })
        res.status(500).json({ message: "Register error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userRepo.findOneBy({ email });
        console.log({ user })

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const payload: any = {
            id: user.id,
            email: user.email
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        refreshTokens.push(refreshToken);

        res.json({ accessToken, refreshToken });

    } catch (err) {
        console.error({ err })
        res.status(500).json({ message: "Login error" });
    }
};

export const refresh = (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    try {
        const user: any = verifyRefreshToken(refreshToken);
        const payload: any = {
            id: user.id,
            email: user.email
        };

        const newAccessToken = generateAccessToken(payload);
        res.json({ accessToken: newAccessToken });
    } catch {
        res.status(401).json({ message: "Token expired" });
    }
};

