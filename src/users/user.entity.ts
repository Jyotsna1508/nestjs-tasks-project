import { Task } from "src/tasks/tasks.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{

@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
name: string;


@Column()
email: string;

@Column({nullable: true})
password: string;

@CreateDateColumn()
createAt: Date;

@UpdateDateColumn()
updatedAt: Date;

// @OneToMany(()=> Task, task => task.user)
// tasks: Task[];

}