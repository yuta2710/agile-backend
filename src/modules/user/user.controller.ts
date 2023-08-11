import { NextFunction, Request, Response, Router } from "express";
import UserService from "./user.service";
import ErrorResponse from "../../utils/exceptions/error.exeptions";
import GeneralController from "@/utils/interfaces/controller.interface";
import { validationMiddleware } from "../../middleware/validation.middleware";
import {create} from "./user.validation";
import colors from "colors";

class UserController implements GeneralController{
    public path = "/users";
    public router: Router = Router();
    public service = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .route(`${this.path}`)
            .get(this.getAllUsers)
            .get(this.getSingleUser)
            .post(validationMiddleware(create), this.createUser);
        this.router
            .route(`${this.path}/:id`)
            .get(this.getSingleUser)
            .put(this.updateUser)
            .delete(this.deleteUser);
    }

    private createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { name, email, password, role } = req.body;
            console.log(name, email, password)
            const user = await this.service.createUser(
                name,
                email,
                password,
                role
            );
            res.status(201).json(user);
        } catch (error) {
            next(new ErrorResponse(400, colors.red.bold(`Unable to create this user`)));
        }
    };

    private getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const users = await this.service.getAllUsers();

            res.status(200).json(users);
        } catch (error) {
            next(new ErrorResponse(400, "Unable to get all users"));
        }
    };

    private getSingleUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const user = await this.service.fetchUserById(req.params.id);

            res.status(200).json(user);
        } catch (error) {
            next(new ErrorResponse(400, "Unable to get this user"));
        }
    };

    private updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const updatedUser = await this.service.updateUser(
                req.params.id,
                req.body
            );

            res.status(200).json(updatedUser);
        } catch (error) {
            next(new ErrorResponse(400, "Unable to update this user"));
        }
    };

    private deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            await this.service.deleteUser(req.params.id);

            res.status(200).json({
                success: true,
                msg: `Successfully delete the user <${req.params.id}>`,
            });
        } catch (error) {
            next(new ErrorResponse(400, "Unable to update this user"));
        }
    };
}

export default UserController