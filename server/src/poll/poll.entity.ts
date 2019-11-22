import { PollOption } from './pollOption.entity';
import { User } from './../user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Poll {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.poll)
    @JoinColumn()
    user: Promise<User>;

    @OneToMany(() => PollOption, pollOption => pollOption.poll)
    pollOption: Promise<PollOption[]>;
}