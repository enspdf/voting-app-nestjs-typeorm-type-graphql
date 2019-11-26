import { PollOption } from './pollOption.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Poll } from './poll.entity';

@EntityRepository(Poll)
export class PollRepository extends Repository<Poll> { }

@EntityRepository(PollOption)
export class PollOptionRepository extends Repository<PollOption> { }
