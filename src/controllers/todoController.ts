import { Request, Response } from "express";
import {
    getTodosService,
    addTodoService,
    deleteTodoService,
    updateTodoService
} from "../service/todoService";

export const getTodos = async (req: Request, res: Response) => {
    try {
        const data = await getTodosService();
        res.json(data);
    } catch {
        res.status(500).json({ message: "Error fetching todos" });
    }
};

export const addTodo = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title required" });
        }

        const todo = await addTodoService(title);
        res.json(todo);
    } catch {
        res.status(500).json({ message: "Error adding todo" });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await deleteTodoService(id);
        res.json({ message: "Deleted" });
    } catch {
        res.status(500).json({ message: "Error deleting todo" });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title required" });
        }

        const updated = await updateTodoService(id, title);
        res.json(updated);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};