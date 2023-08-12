import { Router, Request, Response } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { newUserSchema } from '../schemas/userSchema';
import { UserController } from '../controllers/userController';
import { NewUser } from '../models/userModel';
import { ExitCodes } from '../../db-layer/utils/codes';
import { sign } from 'jsonwebtoken';
import { loginSchema } from '../schemas/loginSchema';
import { Login } from '../models/loginModel';

const authRouter = Router();

authRouter.post(
    '/',
    validateSchema(newUserSchema),
    async (req: Request, res: Response) => {
        const userExists = await UserController.isUser(req.body.email);
        if (userExists) {
            res.status(404).json({ message: 'Email is already used' });
        } else {
            const user = await UserController.addUser(req.body as NewUser);
            res.send(user);
        }
    }
);

authRouter.get(
    '/',
    validateSchema(loginSchema),
    async (req: Request, res: Response) => {
        if (!process.env.JWT_SECRET_KEY) {
            process.exit(ExitCodes.JwtSecretKey);
        }
        const validCredentials = await UserController.verifyUser(
            req.body as Login
        );
        if (validCredentials) {
            const token = sign(
                { email: req.body.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );
            res.json({ token });
        } else {
            res.status(401).json('Bad Credentials');
        }
    }
);

export default authRouter;
