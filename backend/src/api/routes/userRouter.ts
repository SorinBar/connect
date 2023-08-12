import { Router, Request, Response } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { newUserSchema } from '../schemas/userSchema';
import { UserController } from '../controllers/userController';
import { NewUser } from '../models/userModel';
import authenticateToken from '../middlewares/authenticate';

const userRouter = Router();
userRouter.use(authenticateToken);

userRouter.patch(
    '/',
    validateSchema(newUserSchema),
    async (req: Request, res: Response) => {
        res.json('ok');
    }
);

export default userRouter;
