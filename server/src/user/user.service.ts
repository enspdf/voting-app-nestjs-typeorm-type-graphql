import { ErrorResponse } from './shared/errorResponse';
import { UserRepository } from './user.repository';
import { SignupInput } from './input/signupInput';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

        await this.userRepo.save({ ...signupInput });

        return null;
    }
}
