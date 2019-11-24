import { POLL_OPTION_ID_PREFIX } from './../constants';
import { redis } from './../redis';
import { PollRepository, PollOptionRepository } from './poll.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Context as Ctx } from '../types/context';
import { Poll } from './poll.entity';

@Injectable()
export class PollService {
    constructor(
        @InjectRepository(PollRepository)
        private readonly pollRepo: PollRepository,

        @InjectRepository(PollOptionRepository)
        private readonly pollOptionRepo: PollOptionRepository,
    ) { }

    async createPoll(userId: string, name: string, options: string[]): Promise<Boolean> {
        const poll = await this.pollRepo.insert({
            name, userId,
        });

        options.map(async text => {
            await this.pollOptionRepo.insert({
                text,
                votes: 0,
                pollId: poll.raw[0].id,
            });
        });

        const newPoll = await this.pollRepo.findOne({ where: { id: poll.raw[0].id }, relations: ['pollOption'] });
        return true;
    }

    async vote(ctx: Ctx, pollOptionId: number): Promise<Boolean> {
        const pollOption = await this.pollOptionRepo.findOne({ where: { id: pollOptionId } });

        const ip = ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;

        if (ip) {
            const hasIp = await redis.sismember(`${POLL_OPTION_ID_PREFIX}${pollOption.pollId}`, ip);

            if (hasIp) {
                return false;
            }
        }

        await this.pollOptionRepo.update({ id: pollOptionId }, { votes: pollOption.votes + 1 });

        await redis.sadd(`${POLL_OPTION_ID_PREFIX}${pollOption.pollId}`, ip);

        return true;
    }

    async poll(id: number): Promise<Poll> {
        return await this.pollRepo.findOne({ where: { id }, relations: ['pollOption'] });
    }
}
