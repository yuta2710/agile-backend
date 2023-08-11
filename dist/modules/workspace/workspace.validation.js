"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const joi_1 = __importDefault(require("joi"));
exports.create = joi_1.default.object({
    title: joi_1.default.string().required().trim(),
    description: joi_1.default.string().trim(),
});
//# sourceMappingURL=workspace.validation.js.map