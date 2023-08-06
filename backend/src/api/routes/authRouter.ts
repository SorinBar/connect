import Express, { Router, Request, Response } from 'express'
import validateSchema from '../middlewares/validateSchema'
import { userSchema } from '../schemas/userSchema'

const authRouter = Express.Router()

authRouter.post(
    '/',
    validateSchema(userSchema),
    (req: Request, res: Response) => {
        // Handle GET request for users
        res.send('List of users')
    }
)

// authRouter.post(
//     '/',
//     validateSchema(userSchema),
//     (req: Request, res: Response) => {
//         // Handle GET request for users
//         res.send('List of users')
//     }
// )

export default authRouter
