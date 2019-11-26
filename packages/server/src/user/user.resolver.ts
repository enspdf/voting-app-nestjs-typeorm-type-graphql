import { YupValidationPipe } from './../pipes/yupValidationPipe';
import { LoginInput } from './input/user.loginInput';
import { ErrorResponse } from './shared/errorResponse';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Context as Ctx } from '../types/context';
import { SignupInput } from './input/user.signupInput';
import { UsePipes } from '@nestjs/common';
import { signupInputSchema } from '@votingapp/common';

@Resolver(User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(returns => [ErrorResponse], { nullable: true })
    @UsePipes(new YupValidationPipe(signupInputSchema))
    async signUp(@Args('signupInput') signupInput: SignupInput): Promise<ErrorResponse[] | null> {
        return this.userService.signup(signupInput);
    }

    @Mutation(returns => [ErrorResponse], { nullable: true })
    async login(@Args('loginInput') loginInput: LoginInput, @Context() ctx: Ctx): Promise<ErrorResponse[] | null> {
        return this.userService.login(loginInput, ctx.req);
    }

    @Mutation(returns => Boolean)
    async logout(@Context() ctx: Ctx) {
        return this.userService.logout(ctx);
    }
}
