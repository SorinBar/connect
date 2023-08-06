import { Router } from 'express'
import singUpRouter from './authRouter'

const router = Router()

router.use('/auth', singUpRouter)

export default router
