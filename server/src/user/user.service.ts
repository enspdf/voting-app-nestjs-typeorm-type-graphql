import { errorMessage } from './shared/errorMessage';
import { LoginInput } from './input/user.loginInput';
import { CONFIRM_EMAIL_PREFIX } from './../constants';
import { redis } from './../redis';
import { confirmEmailLink } from './../utils/confirmEmailLink';
import { sendEmail } from './../utils/sendEmail';
import { ErrorResponse } from './shared/errorResponse';
import { UserRepository } from './user.repository';
import { SignupInput } from './input/user.signupInput';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, Request } from 'express';
import { compare } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepo: UserRepository,
    ) { }

    async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
        const userExist = await this.userRepo.findOne({ where: { email: signupInput.email } });

        if (userExist) {
            return errorMessage('email', 'Invalid email or password');
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

    async login(loginInput: LoginInput, req: Request): Promise<ErrorResponse[] | null> {
        const user = await this.userRepo.findOne({ where: { email: loginInput.email } });

        if (!user) {
            return errorMessage('email', 'Invalid email or password');
        }

        if (user.confirmed === false) {
            return errorMessage('email', 'Confirm email');
        }

        const checkPassword = await compare(loginInput.password, user.password);

        if (!checkPassword) {
            return errorMessage('email', 'Invalid email or password');
        }

        req.session.userId = user.id;

        return null;
    }
}
