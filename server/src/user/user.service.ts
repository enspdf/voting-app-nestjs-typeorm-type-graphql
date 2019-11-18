import { CONFIRM_EMAIL_PREFIX } from './../constants';
import { redis } from './../redis';
import { confirmEmailLink } from './../utils/confirmEmailLink';
import { sendEmail } from './../utils/sendEmail';
import { ErrorResponse } from './shared/errorResponse';
import { UserRepository } from './user.repository';
import { SignupInput } from './input/signupInput';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepo: UserRepository,
    ) { }

    async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
        const userExist = await this.userRepo.findOne({ where: { email: signupInput.email } });

        if (userExist) {
            return [
                {
                    path: 'email',
                    message: 'Invalid email or password',
                }
            ];
        }

        const user = await this.userRepo.save({ ...signupInput });
        await sendEmail(signupInput.email, await confirmEmailLink(user.id));

        return null;
    }

    async confirmEmail(id: string, res: Response) {
        const userId = await redis.get(`${CONFIRM_EMAIL_PREFIX}${id}`);

        if (!userId) {
            throw new NotFoundException();
        }

        await this.userRepo.update({ id: userId }, { confirmed: true });

        res.send('ok');
    }
}
