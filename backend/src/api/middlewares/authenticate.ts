import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

function authenticateToken(
    req: Request,
    res: Response,
    next: express.NextFunction
) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET_KEY) {
        res.status(500).json('jwt secret key not found');
        return;
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json('Token is invalid or expired');
            }
            res.locals.user = user;
            next();
        });
    } else {
        res.status(401).json('No token provided');
    }
}

export default authenticateToken;
