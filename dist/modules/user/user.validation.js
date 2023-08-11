"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const joi_1 = __importDefault(require("joi"));
exports.create = joi_1.default.object({
    name: joi_1.default.string().required().trim(),
    email: joi_1.default.string().email().required().trim(),
    password: joi_1.default.string().required().min(6).trim(),
    role: joi_1.default.string().required().trim()
});
//# sourceMappingURL=user.validation.js.map