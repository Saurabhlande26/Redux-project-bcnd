import { Repository } from "../repository/todoRepository";

export const getTodosService = async () => {
    return await Repository.find();
};

export const addTodoService = async (title: string) => {
    const todo = Repository.create({ title });
    return await Repository.save(todo);
};

export const deleteTodoService = async (id: number) => {
    return await Repository.delete(id);
};

export const updateTodoService = async (id: number, title: string) => {
    const todo = await Repository.findOneBy({ id });

    if (!todo) {
        throw new Error("Todo not found");
    }

    todo.title = title;

    return await Repository.save(todo);
};