import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks.model";
import { User } from "src/users/user.entity";
import { IsNotEmpty, IsUUID } from "class-validator";
import { TaskLabel } from "./task-label.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    title: string;

    @Column({
        type: "text",
        nullable: false
    })
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.OPEN
    })
    taskStatus: TaskStatus
    // @Column()
    // @IsNotEmpty()
    // @IsUUID()
    // userId: string;
    // @ManyToOne(()=> User, user=> user.tasks, { nullable: false })
    // user: User;
    
    @OneToMany(()=> TaskLabel, label => label.task, {
        cascade: true,
        orphanedRowAction: 'delete'
    })
    labels: TaskLabel
}