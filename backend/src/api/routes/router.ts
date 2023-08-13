import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import contactRouter from './contactRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/contact', contactRouter);

export default router;
