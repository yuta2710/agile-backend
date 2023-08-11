"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const token_utils_1 = require("../utils/token.utils");
const error_exeptions_1 = __importDefault(require("../utils/exceptions/error.exeptions"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const protect = async (req, res, next) => {
    // check exist of bearer 
    // split the token 
    // verify the token to get payload 
    // Find user and assign it 
    if (!req.headers.authorization &&
        !req.headers.authorization.startsWith("Bearer ")) {
        next(new error_exeptions_1.default(403, "Unauthorized to access this route"));
    }
    const token = req.headers.authorization.split("Bearer ")[1].trim();
    try {
        const payload = await (0, token_utils_1.verifyToken)(token);
        if (payload instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(new error_exeptions_1.default(401, `Unable to access this route`));
        }
        const user = await user_model_1.default.findById(payload.id).select("-password").exec();
        if (!user) {
            return next(new error_exeptions_1.default(404, `User <${payload.id}> not found`));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new error_exeptions_1.default(404, error.message));
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new error_exeptions_1.default(404, `A role <${req.user.role}> cannot access this route>`));
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authenticated.middleware.js.map