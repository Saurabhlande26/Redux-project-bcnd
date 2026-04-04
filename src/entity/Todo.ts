import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user!: User;
}