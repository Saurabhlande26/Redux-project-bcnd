import { AppDataSource } from "../config/db";
import { Todo } from "../entity/Todo";

export const todoRepository = AppDataSource.getRepository(Todo);