import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ExitCodes } from '../../db-layer/utils/codes';

function authenticateToken(
    req: Request,
    res: Response,
    next: express.NextFunction
) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET_KEY) {
        process.exit(ExitCodes.JwtSecretKey);
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json('Token is invalid or expired');
            }
            next();
        });
    } else {
        res.status(401).json('No token provided');
    }
}

export default authenticateToken;
