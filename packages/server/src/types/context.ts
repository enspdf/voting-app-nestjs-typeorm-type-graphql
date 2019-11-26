import { PollOption } from './../poll/pollOption.entity';
import { Request, Response } from 'express';
import * as DataLoader from 'dataloader';

export interface Context {
    req: Request;
    res: Response;
    pollOptionLoader: DataLoader<number, PollOption[]>;
}
