import { User } from './../user/user.entity';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { hash } from 'bcryptjs';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User>{
    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {
        event.entity.password = await hash(event.entity.password, 12);
    }
}