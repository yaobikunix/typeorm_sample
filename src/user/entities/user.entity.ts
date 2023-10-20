import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// テーブルのカラム設定
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickName: string;

    @Column({ default: false })
    isAdult: boolean;
}
