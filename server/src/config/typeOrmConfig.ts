import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'votingapp',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    dropSchema: true,
};