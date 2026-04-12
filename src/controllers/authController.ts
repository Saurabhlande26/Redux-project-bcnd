import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import bcrypt from 'bcrypt';
import { refreshRepo, userRepo } from "../config/envConfig";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existing = await userRepo.findOneBy({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = userRepo.create({ email, password: hashed });
        await userRepo.save(user);
        res.json({ message: "User created" });
    } catch (err) {
        res.status(500).json({ message: "Register error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userRepo.findOneBy({ email });
        if (!user) return res.status(401).json({ message: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });
        const payload: any = { id: user.id, email: user.email };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        const tokenEntity = refreshRepo.create({ token: refreshToken, user });

        await refreshRepo.save(tokenEntity);
        res.json({ accessToken, refreshToken, user });
    } catch (err) {
        res.status(500).json({ message: "Login error" });
    }
};

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const tokenInDb = await refreshRepo.findOne({
        where: { token: refreshToken, isRevoked: false },
        relations: ["user"]
    });

    if (!tokenInDb) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    try {
        const user: any = verifyRefreshToken(refreshToken);
        const payload: any = {
            id: user.id,
            email: user.email
        };

        const accessToken = generateAccessToken(payload);
        res.json({ accessToken });
    } catch {
        res.status(401).json({ message: "Token expired" });
    }
};

export const logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    await refreshRepo.update(
        { token: refreshToken },
        { isRevoked: true }
    );

    res.json({ message: "Logged out" });
};