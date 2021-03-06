import { pollOptionLoader } from './loaders/pollOptionLoader';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { typeOrmConfig } from './config/typeOrmConfig';
import { PollModule } from './poll/poll.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res, pollOptionLoader: pollOptionLoader }),
    }),
    UserModule,
    PollModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
