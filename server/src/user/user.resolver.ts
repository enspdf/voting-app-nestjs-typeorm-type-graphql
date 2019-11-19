import { LoginInput } from './input/user.loginInput';
import { ErrorResponse } from './shared/errorResponse';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Context as Ctx } from '../types/context';
import { SignupInput } from './input/user.signupInput';

@Resolver(User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(returns => String)
    async hello() {
        return 'Hello World';
    }

    @Mutation(returns => [ErrorResponse], { nullable: true })
    async signUp(@Args('signupInput') signupInput: SignupInput): Promise<ErrorResponse[] | null> {
        return this.userService.signup(signupInput);
    }

    @Mutation(returns => [ErrorResponse], { nullable: true })
    async login(@Args('loginInput') loginInput: LoginInput, @Context() ctx: Ctx): Promise<ErrorResponse[] | null> {
        return this.userService.login(loginInput, ctx.req);
    }
}
