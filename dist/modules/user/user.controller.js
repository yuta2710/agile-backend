"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = __importDefault(require("./user.service"));
const error_exeptions_1 = __importDefault(require("../../utils/exceptions/error.exeptions"));
const validation_middleware_1 = require("../../middleware/validation.middleware");
const user_validation_1 = require("./user.validation");
const colors_1 = __importDefault(require("colors"));
class UserController {
    path = "/users";
    router = (0, express_1.Router)();
    service = new user_service_1.default();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(`${this.path}`)
            .get(this.getAllUsers)
            .get(this.getSingleUser)
            .post((0, validation_middleware_1.validationMiddleware)(user_validation_1.create), this.createUser);
        this.router
            .route(`${this.path}/:id`)
            .get(this.getSingleUser)
            .put(this.updateUser)
            .delete(this.deleteUser);
    }
    createUser = async (req, res, next) => {
        try {
            const { name, email, password, role } = req.body;
            console.log(name, email, password);
            const user = await this.service.createUser(name, email, password, role);
            res.status(201).json(user);
        }
        catch (error) {
            next(new error_exeptions_1.default(400, colors_1.default.red.bold(`Unable to create this user`)));
        }
    };
    getAllUsers = async (req, res, next) => {
        try {
            const users = await this.service.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            next(new error_exeptions_1.default(400, "Unable to get all users"));
        }
    };
    getSingleUser = async (req, res, next) => {
        try {
            const user = await this.service.fetchUserById(req.params.id);
            res.status(200).json(user);
        }
        catch (error) {
            next(new error_exeptions_1.default(400, "Unable to get this user"));
        }
    };
    updateUser = async (req, res, next) => {
        try {
            const updatedUser = await this.service.updateUser(req.params.id, req.body);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            next(new error_exeptions_1.default(400, "Unable to update this user"));
        }
    };
    deleteUser = async (req, res, next) => {
        try {
            await this.service.deleteUser(req.params.id);
            res.status(200).json({
                success: true,
                msg: `Successfully delete the user <${req.params.id}>`,
            });
        }
        catch (error) {
            next(new error_exeptions_1.default(400, "Unable to update this user"));
        }
    };
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map