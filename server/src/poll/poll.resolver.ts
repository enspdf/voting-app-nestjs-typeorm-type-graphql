import { Poll } from './poll.entity';
import { PollService } from './poll.service';
import { CreatePollArgs } from './args/createPollArgs.args';
import { AuthGuard } from './auth.guard';
import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetUserId } from './getUserId.decorator';
import { Context as Ctx } from '../types/context';

@Resolver('Poll')
export class PollResolver {
    constructor(private readonly pollService: PollService) { }

    @Mutation(returns => Boolean)
    @UseGuards(AuthGuard)
    async createPoll(@GetUserId() userId: string, @Args() { name, options }: CreatePollArgs): Promise<Boolean> {
        return this.pollService.createPoll(userId, name, options);
    }

    @Mutation(returns => Boolean)
    async vote(@Context() ctx: Ctx, @Args('pollOptionId') pollOptionId: number): Promise<Boolean> {
        return this.pollService.vote(ctx, pollOptionId);
    }

    @Query(returns => Poll)
    async poll(@Args('id') id: number): Promise<Poll> {
        return this.pollService.poll(id);
    }
}
