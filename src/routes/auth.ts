import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
const router = express.Router();

const SECRET = "mysecretkey";

// Dummy user (replace with DB)
const user = {
    id: 1,
    email: "test@gmail.com",
    password: "123456"
};

// LOGIN
router.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email !== user.email || password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

// PROTECTED ROUTE
router.get("/dashboard", (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, SECRET);
        res.json({ message: "Welcome", user: decoded });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

export default router;