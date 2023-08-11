"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.sendTokenResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendTokenResponse = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};
exports.sendTokenResponse = sendTokenResponse;
const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err)
                reject(err);
            resolve(payload);
        });
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.utils.js.map