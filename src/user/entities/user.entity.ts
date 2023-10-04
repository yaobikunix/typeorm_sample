import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// table設定
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;
}
