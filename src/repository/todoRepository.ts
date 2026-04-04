import { AppDataSource } from "../config/data-source";
import { Todo } from "../entity/Todo";

export const Repository = AppDataSource.getRepository(Todo);