import { User } from '../user.entity';
import {InputType, Field} from 'type-graphql';

@InputType({description: 'Sign Up Input'})
export class SignupInput implements Partial<User> {
    @Field()
    userName: string;

    @Field()
    email: string;

    @Field()
    password: string;
}