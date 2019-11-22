import { Poll } from './poll.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class PollOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @Column('integer')
    votes: number;

    @ManyToOne(() => Poll, poll => poll.pollOption)
    @JoinColumn()
    poll: Promise<Poll>;
}