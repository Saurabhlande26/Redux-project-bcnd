import { todoRepository } from "../repository/todoRepository";

export const getTodosService = async () => {
    return await todoRepository.find();
};

export const addTodoService = async (title: string) => {
    const todo = todoRepository.create({ title });
    return await todoRepository.save(todo);
};

export const deleteTodoService = async (id: number) => {
    return await todoRepository.delete(id);
};