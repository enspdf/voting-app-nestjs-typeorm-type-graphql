import { Poll } from './poll.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class PollOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @Column('integer')
    votes: number;

    @Column()
    pollId: number;

    @ManyToOne(() => Poll, poll => poll.pollOption)
    poll: Promise<Poll>;
}