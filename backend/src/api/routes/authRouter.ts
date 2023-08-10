import { Router, Request, Response } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { newUserSchema, userSchema } from '../schemas/userSchema';

const authRouter = Router();

authRouter.post(
    '/',
    validateSchema(newUserSchema),
    (req: Request, res: Response) => {
        res.status(204).send();
    }
);

// authRouter.post(
//     '/',
//     validateSchema(newUserSchema),
//     (req: Request, res: Response) => {

//         if (!process.env.JWT_SECRET_KEY) {
//             process.exit(ExitCodes.JwtSecretKey);
//         }
//         const token = sign(
//             { email: req.body.email },
//             process.env.JWT_SECRET_KEY,
//             { expiresIn: '1h' }
//         );
//         res.json({ token });
//     }
// );

// authRouter.post(
//     '/',
//     validateSchema(userSchema),
//     (req: Request, res: Response) => {
//         // Handle GET request for users
//         res.send('List of users')
//     }
// )

export default authRouter;
