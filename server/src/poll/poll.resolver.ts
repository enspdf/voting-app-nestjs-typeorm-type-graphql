import { AuthGuard } from './auth.guard';
import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { Context as ctx } from '../types/Context';
import { UseGuards } from '@nestjs/common';

@Resolver('Poll')
export class PollResolver {
    @Mutation(returns => Boolean)
    @UseGuards(AuthGuard)
    async createPoll() {
        return true;
    }
}
