import { Router, Request, Response } from 'express';
import { validateBody, validatePath } from '../middlewares/validate';
import authenticateToken from '../middlewares/authenticate';
import { patchUserSchema, userPathSchema } from '../schemas/userSchema';
import { UserController } from '../controllers/userController';
import { User } from '../models/userModel';
import permissionValidation from '../middlewares/permission';

const userRouter = Router();
userRouter.use(authenticateToken);

userRouter.patch(
    '/:userId',
    validatePath(userPathSchema),
    validateBody(patchUserSchema),
    permissionValidation,
    async (req: Request, res: Response) => {
        const user = await UserController.patchUser({
            ...req.body,
            _id: req.params.userId,
        } as User);
        if (user == null) {
            res.status(400).json('Email is already in use');
        } else {
            res.json(user);
        }
    }
);

export default userRouter;
