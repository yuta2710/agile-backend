"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const error_exeptions_1 = __importDefault(require("../../utils/exceptions/error.exeptions"));
const validation_middleware_1 = require("../../middleware/validation.middleware");
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const authenticated_middleware_1 = require("../../middleware/authenticated.middleware");
class AuthController {
    path = "/auth";
    router = (0, express_1.Router)();
    service = new auth_service_1.default();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(`${this.path}/register`)
            .post((0, validation_middleware_1.validationMiddleware)(user_validation_1.create), this.register);
        this.router
            .route(`${this.path}/login`)
            .post((0, validation_middleware_1.validationMiddleware)(auth_validation_1.login), this.login);
        this.router
            .route(`${this.path}/me`)
            .get(authenticated_middleware_1.protect, this.getMe);
    }
    register = async (req, res, next) => {
        try {
            const { name, email, password, role } = req.body;
            const token = await this.service.register(name, email, password, role);
            res.status(201).json({ success: true, token });
        }
        catch (error) {
            next(new error_exeptions_1.default(400, `Unable to register a user <${req.body.email}>`));
        }
    };
    login = async (req, res, next) => {
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
            });
        }
        catch (error) {
            next(new error_exeptions_1.default(400, `Unable to login a user <${req.body.email}>`));
        }
    };
    getMe = async (req, res, next) => {
        try {
            const me = await this.service.getMe(req.params.id);
            res.status(200).json({ success: true, user: me });
        }
        catch (error) {
            next(new error_exeptions_1.default(400, `Unable to get a user <${req.body.email}>`));
        }
    };
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map