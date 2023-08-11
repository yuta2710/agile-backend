import { NextFunction, Request, Response, Router } from "express";
import AuthService from "./auth.service";
import ErrorResponse from "../../utils/exceptions/error.exeptions";
import { validationMiddleware } from "../../middleware/validation.middleware";
import { create } from "../user/user.validation";
import { login } from "./auth.validation";
import { protect } from "../../middleware/authenticated.middleware";

class AuthController {
    public path: string = "/auth";
    public router: Router = Router();
    public service = new AuthService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router 
            .route(`${this.path}/register`)
                .post(validationMiddleware(create), this.register)
        this.router
            .route(`${this.path}/login`)
                .post(validationMiddleware(login), this.login)

        this.router
            .route(`${this.path}/me`)
                .get(protect, this.getMe)        
    }

    private register = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {name, email, password, role} = req.body;
            const token = await this.service.register(name, email, password, role);

            res.status(201).json({success: true, token});
        } catch (error) {
            next(new ErrorResponse(400, `Unable to register a user <${req.body.email}>`));
        }
    }

    private login = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const token = await this.service.login(email, password);

            console.log(token);

            res.status(200).cookie("token", token, {
                httpOnly: true, 
                expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 1000)
            }).json({
                success: true,
                token
            })
        } catch (error) {
            next(new ErrorResponse(400, `Unable to login a user <${req.body.email}>`));
        }
    }

    private getMe = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const me = await this.service.getMe(req.params.id);

            res.status(200).json({success: true, user: me});
        } catch (error) {
            next(new ErrorResponse(400, `Unable to get a user <${req.body.email}>`));
        }
    }
}

export default AuthController;