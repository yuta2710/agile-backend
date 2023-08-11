import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";

export const validationMiddleware = (schema: Joi.Schema): RequestHandler => {
    return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const opts = {
                abortEarly: false,
                stripUnknown: true,
                allowedUnknown: true,
            };

            const values = await schema.validateAsync(req.body, opts);

            req.body = values;
            next();
        } catch (error) {
            throw new Error(`Unable to validate this middleware`);
        }
    }
}