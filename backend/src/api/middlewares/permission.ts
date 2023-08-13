import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function permissionValidation(
    req: Request,
    res: Response,
    next: express.NextFunction
) {
    if (res.locals.user._id !== req.params.userId) {
        res.status(401).json(
            'This user do not have the permissions to modify another user'
        );
    } else {
        next();
    }
}

export default permissionValidation;
