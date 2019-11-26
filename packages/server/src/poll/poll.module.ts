import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollRepository, PollOptionRepository } from './poll.repository';
import { PollResolver } from './poll.resolver';
import { PollService } from './poll.service';

@Module({
    imports: [TypeOrmModule.forFeature([PollRepository, PollOptionRepository])],
    providers: [PollResolver, PollService],
})
export class PollModule { }
