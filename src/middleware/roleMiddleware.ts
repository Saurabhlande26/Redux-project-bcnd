import { Request, Response, NextFunction } from "express";

export const authorize = (role: "admin" | "user") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user.role !== role) {
      return res.sendStatus(403);
    }

    next();
  };
};