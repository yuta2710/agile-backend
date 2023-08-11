"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
class UserService {
    model = user_model_1.default;
    createUser = async (name, email, password, role) => {
        try {
            const serializeObj = await this.model.create({
                name,
                email,
                password,
                role,
            });
            console.log(serializeObj);
            return serializeObj;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    getAllUsers = async () => {
        try {
            const objs = await this.model.find();
            return objs;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    fetchUserById = async (userId) => {
        try {
            const obj = await this.model
                .findById(userId)
                .exec();
            if (!obj) {
                throw new Error(`User <${userId}> not found`);
            }
            return obj;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    updateUser = async (userId, newObj) => {
        try {
            const updatedObj = await this.model
                .findByIdAndUpdate(userId, newObj, {
                new: true,
            })
                .exec();
            return updatedObj;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    deleteUser = async (userId) => {
        try {
            await this.model.findByIdAndDelete(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map