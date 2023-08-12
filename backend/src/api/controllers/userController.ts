import { ObjectId } from 'mongodb';
import { NewUser, User } from '../models/userModel';
import { createUser, readUser, updateUser } from '../services/user';
import { Login } from '../models/loginModel';

export class UserController {
    public static async isUser(email: string): Promise<boolean> {
        const user = await readUser({ email });
        return user != null;
    }

    public static async addUser(newUser: NewUser): Promise<User | null> {
        await createUser(newUser);
        return await readUser({ email: newUser.email });
    }

    public static async getUserById(_id: string): Promise<User | null> {
        return await readUser({ _id: new ObjectId(_id) });
    }

    public static async getUserByEmail(email: string): Promise<User | null> {
        return await readUser({ email });
    }

    public static async verifyUser(loginCredentials: Login): Promise<boolean> {
        return (await readUser({
            email: loginCredentials.email,
            password: loginCredentials.password,
        }))
            ? true
            : false;
    }

    public static async patchUser(user: User): Promise<User | null> {
        const oldUser = await this.getUserById(user._id);
        const emailUser = await this.getUserByEmail(user.email);

        if (oldUser == null) {
            return null;
        }
        if (emailUser != null && emailUser._id != oldUser._id) {
            return null;
        }
        await updateUser(user);
        return await this.getUserById(user._id);
    }
}
