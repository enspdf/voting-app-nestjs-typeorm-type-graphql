import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    confirmed: boolean;
}