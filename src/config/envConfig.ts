import { RefreshToken } from "../entity/RefreshToken";
import { User } from "../entity/User";
import { AppDataSource } from "./data-source";

export const refreshRepo = AppDataSource.getRepository(RefreshToken);
export const userRepo = AppDataSource.getRepository(User);
