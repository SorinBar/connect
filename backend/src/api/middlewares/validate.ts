import { Request, Response, NextFunction } from 'express';
import { Schema, Maybe, AnyObject, ValidationError } from 'yup';

export function validateBody(schema: Schema<Maybe<AnyObject>>) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await schema.validate(req.body);
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json(error.message);
            } else {
                res.status(400).json(error);
            }
        }
    };
}

export function validatePath(schema: Schema<Maybe<AnyObject>>) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await schema.validate(req.params);
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json(error.message);
            } else {
                res.status(400).json(error);
            }
        }
    };
}
