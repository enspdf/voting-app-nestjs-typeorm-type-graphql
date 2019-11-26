import { CONFIRM_EMAIL_PREFIX } from './../constants';
import { redis } from './../redis';
import { v4 } from 'uuid';

export const confirmEmailLink = async (userId: string) => {
    const id = v4();

    await redis.set(`${CONFIRM_EMAIL_PREFIX}${id}`, userId, 'ex', 60 * 60 * 15);

    return `${process.env.BACKEND_HOST}/user/confirm/${id}`;
};
