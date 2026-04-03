import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "../entity/Todo";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "your_password",
  database: "todo_app",
  synchronize: true, // auto create table (dev only)
  logging: false,
  entities: [Todo]
});