import jwt from "jsonwebtoken";

const generateToken = (user: any) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
};

export default generateToken;