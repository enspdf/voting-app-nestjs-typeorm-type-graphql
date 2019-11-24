import { PollService } from './poll.service';
import { CreatePollArgs } from './args/createPollArgs.args';
import { AuthGuard } from './auth.guard';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetUserId } from './getUserId.decorator';

@Resolver('Poll')
export class PollResolver {
    constructor(private readonly pollService: PollService) { }

    @Mutation(returns => Boolean)
    @UseGuards(AuthGuard)
    async createPoll(@GetUserId() userId: string, @Args() { name, options }: CreatePollArgs): Promise<Boolean> {
        return this.pollService.createPoll(userId, name, options);
    }
}
