import { ObjectType, Field } from 'type-graphql';
import { PollOption } from './pollOption.entity';
import { User } from './../user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Poll {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    userId: string;

    @ManyToOne(() => User, user => user.poll)
    user: Promise<User>;

    @Field(() => [PollOption])
    @OneToMany(() => PollOption, pollOption => pollOption.poll)
    pollOption: Promise<PollOption[]>;
}