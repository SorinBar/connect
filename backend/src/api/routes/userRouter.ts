import { Router, Request, Response } from 'express';
import validateSchema from '../middlewares/validateSchema';
import authenticateToken from '../middlewares/authenticate';
import { userSchema } from '../schemas/userSchema';
import { UserController } from '../controllers/userController';
import { User } from '../models/userModel';
import permissionValidation from '../middlewares/permission';

const userRouter = Router();
userRouter.use(authenticateToken);

userRouter.patch(
    '/',
    validateSchema(userSchema),
    permissionValidation,
    async (req: Request, res: Response) => {
        const user = await UserController.patchUser(req.body as User);
        if (user == null) {
            res.status(400).json(
                'User do not exist or email is already in use'
            );
        } else {
            res.json(user);
        }
    }
);

export default userRouter;
