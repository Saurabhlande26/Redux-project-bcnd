import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "../entity/Todo";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "todo_app",
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
  logging: false,
  entities: [User, Todo]
});