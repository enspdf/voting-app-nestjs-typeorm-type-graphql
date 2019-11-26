import { User } from './../user.entity';
import { InputType, Field } from 'type-graphql';

@InputType({ description: 'Login Input' })
export class LoginInput implements Partial<User> {
    @Field()
    email: string;

    @Field()
    password: string;
}