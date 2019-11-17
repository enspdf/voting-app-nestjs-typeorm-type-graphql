import { ErrorResponse } from './shared/errorResponse';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignupInput } from './input/signupInput';

@Resolver(User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(returns => String)
    async hello() {
        return 'Hello World';
    }

    @Mutation(returns => [ErrorResponse], { nullable: true })
    async signUp(
        @Args('signupInput') signupInput: SignupInput): Promise<ErrorResponse[] | null> {
        return this.userService.signup(signupInput);
    }
}
