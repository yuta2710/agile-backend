"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../user/user.model"));
const user_service_1 = __importDefault(require("../user/user.service"));
const token_utils_1 = require("../../utils/token.utils");
class AuthService {
    service = new user_service_1.default();
    model = user_model_1.default;
    register = async (name, email, password, role) => {
        try {
            const user = await this.service.createUser(name, email, password, role);
            const token = (0, token_utils_1.sendTokenResponse)(user);
            return token;
        }
        catch (error) {
            throw new Error("Unable to create this user");
        }
    };
    login = async (email, password) => {
        try {
            // Check existence of user 
            // Check valid password or not 
            // generate token
            const user = await this.model.findOne({ email }).exec();
            console.log(user);
            if (!user) {
                throw new Error(`Unable to create this user <${email}>`);
            }
            if (!(await user.isValidPassword(password))) {
                throw new Error("Wrong credentials given");
            }
            else {
                return (0, token_utils_1.sendTokenResponse)(user);
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    getMe = async (userId) => {
        try {
            const me = await this.service.fetchUserById(userId);
            if (!me) {
                throw new Error(`User <${userId}> not found`);
            }
            return me;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map