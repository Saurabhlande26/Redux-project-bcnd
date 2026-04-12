import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    token!: string;

    @Column({ default: false })
    isRevoked!: boolean;

    @ManyToOne(() => User)
    user!: User;
}