import { Router, Request, Response } from 'express';
import { validateBody, validatePath } from '../middlewares/validate';
import authenticateToken from '../middlewares/authenticate';
import { patchUserSchema, userPathSchema } from '../schemas/userSchema';
import { UserController } from '../controllers/userController';
import { User } from '../models/userModel';
import permissionValidation from '../middlewares/permission';
import { genHash } from '../utils/hash';

const userRouter = Router();

userRouter.get(
    '/:userId/name',
    validatePath(userPathSchema),
    async (req: Request, res: Response) => {
        const user = await UserController.getUserById(req.params.userId);
        if (user == null) {
            res.status(400).json({ message: 'User not found' });
        } else {
            res.json({ name: user.name });
        }
    }
);

userRouter.get(
    '/:userId',
    authenticateToken,
    validatePath(userPathSchema),
    permissionValidation,
    async (req: Request, res: Response) => {
        const user = await UserController.getUserById(req.params.userId);
        if (user == null) {
            res.status(400).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    }
);

userRouter.patch(
    '/:userId',
    authenticateToken,
    validatePath(userPathSchema),
    validateBody(patchUserSchema),
    permissionValidation,
    async (req: Request, res: Response) => {
        // Not used
        const user = await UserController.patchUser({
            ...req.body,
            password: genHash(req.body.password),
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
