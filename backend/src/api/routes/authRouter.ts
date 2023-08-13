import { Router, Request, Response } from 'express';
import { validateBody } from '../middlewares/validate';
import { newUserSchema } from '../schemas/userSchema';
import { UserController } from '../controllers/userController';
import { NewUser } from '../models/userModel';
import { ExitCodes } from '../../db-layer/utils/codes';
import { sign } from 'jsonwebtoken';
import { loginSchema } from '../schemas/loginSchema';
import { Login } from '../models/loginModel';
import { ContactController } from '../controllers/contactController';

const authRouter = Router();

authRouter.post(
    '/',
    validateBody(newUserSchema),
    async (req: Request, res: Response) => {
        const userExists = await UserController.isUser(req.body.email);
        if (userExists) {
            res.status(404).json({ message: 'Email is already used' });
        } else {
            const user = await UserController.addUser(req.body as NewUser);
            if (!user) {
                res.status(500).json({ message: 'Add user database error' });
                return;
            }
            const contact = await ContactController.addContact({
                userId: user._id,
            });
            if (!contact) {
                UserController.removeUser(user._id);
                res.status(500).json({ message: 'Add contact database error' });
                return;
            }
            res.send({
                user: user,
                contact: contact,
            });
        }
    }
);

authRouter.get(
    '/',
    validateBody(loginSchema),
    async (req: Request, res: Response) => {
        if (!process.env.JWT_SECRET_KEY) {
            process.exit(ExitCodes.JwtSecretKey);
        }
        const verifiedUser = await UserController.verifyUser(req.body as Login);
        if (verifiedUser != null) {
            const token = sign(
                { _id: verifiedUser._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );
            res.json({ token });
        } else {
            res.status(401).json('Bad credentials');
        }
    }
);

export default authRouter;
