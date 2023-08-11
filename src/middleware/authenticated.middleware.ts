import { verifyToken } from "../utils/token.utils";
import ErrorResponse from "../utils/exceptions/error.exeptions";
import { NextFunction, Request, Response } from "express"
import Token from "../utils/interfaces/token.interface";
import jwt from "jsonwebtoken";
import userModel from "../modules/user/user.model";

export const protect = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    // check exist of bearer 
    // split the token 
    // verify the token to get payload 
    // Find user and assign it 
    
    if (
        !req.headers.authorization &&
        !req.headers.authorization.startsWith("Bearer ")
    ) {
        next(new ErrorResponse(403, "Unauthorized to access this route"));
    }

    const token = req.headers.authorization.split("Bearer ")[1].trim();


    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(token);

        if(payload instanceof jwt.JsonWebTokenError) {
            return next(new ErrorResponse(401, `Unable to access this route`));
        }

        const user = await userModel.findById(payload.id).select("-password").exec();

        if(!user) {
            return next(new ErrorResponse(404, `User <${payload.id}> not found`));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(
            new ErrorResponse(404, error.message)
        );
    }
}

export const authorize = (...roles: string[]): ((req: Request, res: Response, next: NextFunction) => void)  => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if(!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    404,
                    `A role <${req.user.role}> cannot access this route>`
                )
            );
        }
        next()
    }
}