import ErrorResponse from "@/utils/exceptions/error.exeptions";
import { NextFunction, Request, Response } from "express";

export const errorResponseMiddleware = async (
    err: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const status: number = err.statusCode || 500;
    const message: string = err.message || "Something went wrong";

    res.status(status).json(message);
};
