import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const secretKey = '0cDK8&7acZ7XO^SpLFQW'

function authenticateToken(
    req: Request,
    res: Response,
    next: express.NextFunction
) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json('Token is invalid or expired')
            }
            next()
        })
    } else {
        res.status(401).json('No token provided')
    }
}

export default authenticateToken
