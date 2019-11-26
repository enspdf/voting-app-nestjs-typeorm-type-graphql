import { ObjectType, Field } from 'type-graphql';
import { Poll } from './poll.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class PollOption {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column('text')
    text: string;

    @Field()
    @Column('integer')
    votes: number;

    @Field()
    @Column()
    pollId: number;

    @ManyToOne(() => Poll, poll => poll.pollOption, { onDelete: 'CASCADE' })
    poll: Promise<Poll>;
}