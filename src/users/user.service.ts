import { DeleteUserInput } from './dto/input/delete-user.input';
import { GetUsersArgs } from './dto/args/get-users.args';
import { GetUserArgs } from './dto/args/get-user.args';
import { UpdateUserInput } from './dto/input/update-user.input';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './models/user';
import { CreateUserInput } from './dto/input/create-user.input';

interface CreateUserPayload {
    success: boolean;
    error?: string
}

@Injectable()
export class UsersService {
    private users: User[] = [];

    public createUser(createUserData: CreateUserInput): CreateUserPayload {
        const user: User = {
            userId: uuidv4(),
            ...createUserData
        }
        console.log('user', user);
        
        return {
            success: true
        }
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.userIds.map(userId => this.getSingleUser({userId}))
    }

    public getSingleUser(getUserArgs: GetUserArgs): User {
        return this.users.find(user => user.userId === getUserArgs.userId);
    }

    public updateUser(updateUserData: UpdateUserInput): User {
        const user = this.users.find(user => user.userId === updateUserData.userId);

        Object.assign(user, updateUserData);

        return user;
    }

    public deleteUser(deleteUserData: DeleteUserInput): User {
        const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId);

        const user = this.users[userIndex];

        this.users.splice(userIndex);

        return user;
    }


}